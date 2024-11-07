import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { User } from "@prisma/client"; // Import Prisma's User type
import { Response } from "express";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { generate } from "otp-generator";
import { compare, hash } from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import * as uuid from "uuid";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { AddMinutesToDate } from "../common/helpers/add-minute";
import { decode, encode } from "../common/helpers/crypto";
import { ConfirmPassportDataDto, UserSigInDto } from "./dto";
import NodeCache from "node-cache";

const myCache = new NodeCache();

@Injectable()
export class AuthUserService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma:PrismaService
  ) {}

  // Token generation
  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  // Update refresh token in database
  async updateRefreshToken(userId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: hashed_refresh_token },
    });
  }

  // Sign-up method
  async signUp(res: Response, createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const tokens = await this.generateTokens(user);
    if (!tokens) {
      throw new BadRequestException("Token generation failed");
    }

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    const otp = generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    // Handle OTP in the cache and database
    await this.prisma.otp.deleteMany({ where: { email: user.email } });

    const newOtp = await this.prisma.otp.create({
      data: {
        id: uuid.v4(),
        otp,
        expiration_time,
        email: user.email,
      },
    });

    const details = {
      time: now,
      email: user.email,
      otp_id: newOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    try {
      await this.mailService.sendMail(user, otp);
    } catch (error) {
      console.error("Error on signup", error);
      throw new InternalServerErrorException(
        "Error sending activation OTP code"
      );
    }

    myCache.set(otp, encodedData, 3000);

    return {
      id: user.id,
      access_token: tokens.access_token,
      sms: "Otp code sent to your email",
    };
  }

  // Verify OTP method
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, email } = verifyOtpDto;
    const currentTime = new Date();

    const data: any = await myCache.get(otp);

    if (!data) {
      throw new BadRequestException("Code incorrect or time expired");
    }
    const decodedData = await decode(data);
    const details = JSON.parse(decodedData);

    if (details.email !== email) {
      throw new BadRequestException("OTP has not been sent to this email");
    }

    const resultOtp = await this.prisma.otp.findUnique({
      where: { id: details.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException("This OTP not found");
    }

    if (resultOtp.verified) {
      throw new BadRequestException("This user already activated");
    }

    if (resultOtp.expiration_time < currentTime) {
      throw new BadRequestException("This OTP has expired");
    }

    if (resultOtp.otp !== otp) {
      throw new BadRequestException("OTP does not match");
    }

    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { is_active: true },
    });

    await this.prisma.otp.update({
      where: { id: details.otp_id },
      data: { verified: true },
    });

    return {
      message: "You have been activated",
      id: updatedUser.id,
    };
  }

  // Sign-in method
  async signIn(res: Response, userSignInDto: UserSigInDto) {
    const { email, password } = userSignInDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Password or Email incorrect");
    }

    const validPassword = await compare(password, user.hashedPassword);
    if (!validPassword) {
      throw new UnauthorizedException("Password or Email incorrect");
    }

    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  // Handle refresh token method
  async handleRefreshToken(
    userId: number,
    refreshToken: string,
    res: Response
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.hashedRefreshToken) {
      throw new BadRequestException("User not found");
    }
    const rMatchesh = await compare(refreshToken, user.hashedRefreshToken);
    if (!rMatchesh) {
      throw new ForbiddenException("Access denied");
    }

    const decodedToken = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!decodedToken) {
      throw new UnauthorizedException("Token expired");
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    return {
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  // Sign-out method
  async userSignOut(userId: number, res: Response) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    res.clearCookie("refresh_token");
    return {
      message: "User successfully signed out",
    };
  }

  // Confirm passport data
  async confirmPassportData(confirmPassportDataDto: ConfirmPassportDataDto) {
    const {
      birth_date,
      passport_expiry_date,
      passport_issue_date,
      passport_number,
      phone_number,
    } = confirmPassportDataDto;

    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: phone_number },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    if (!user.is_active) {
      throw new BadRequestException("You need to be active first");
    }

    if (user.verified) {
      throw new BadRequestException("User is already verified");
    }

    await this.prisma.user.update({
      where: { phoneNumber: phone_number },
      data: {
        
        verified: true,
      },
    });

    return {
      message: "Your passport data has been confirmed",
    };
  }
}

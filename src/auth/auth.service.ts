import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthSignInDto } from "./dto";
import { Response } from "express";
import { hash, compare } from "bcrypt";
import { JwtPayload, ResponseFields, Tokens } from "../common/types";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Admin } from "@prisma/client";
import { decode } from "../common/helpers/crypto";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin): Promise<Tokens> {
    const payload: JwtPayload = {
      id: admin.id,
      email: admin.email,
      phone: admin.phone_number,
      roleId: admin.roleId,
      login: admin.login,
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

  async updateRefreshToken(adminId: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { hashed_refresh_token },
    });
  }

  async signUp(
    createAdminDto: CreateAdminDto,
    res: Response
  ): Promise<ResponseFields> {
    const hashedPassword = await hash(createAdminDto.hashedPassword, 7);
    const newAdmin = await this.prisma.admin.create({
      data: {
        name: createAdminDto.name,
        login: createAdminDto.login,
        email: createAdminDto.email,
        phone_number: createAdminDto.phone_number,
        hashedPassword: hashedPassword,
        description: createAdminDto.description,
        confirmPassword: createAdminDto.confirmPassword,
        roleId: createAdminDto.roleId,
      },
    });

    const { access_token, refresh_token } = await this.generateTokens(newAdmin);
    await this.updateRefreshToken(newAdmin.id, refresh_token);
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return { id: newAdmin.id, access_token };
  }

  async signIn(
    authSignInDto: AuthSignInDto,
    res: Response
  ): Promise<ResponseFields> {
    const { hashedPassword, login } = authSignInDto;

    const admin = await this.prisma.admin.findUnique({ where: { login } });
    if (!admin) {
      throw new BadRequestException("Login or password incorrect");
    }

    const validPassword = await compare(hashedPassword, admin.hashedPassword);
    if (!validPassword) {
      throw new BadRequestException("Login or password incorrect");
    }

    const tokens = await this.generateTokens(admin);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });
    return {
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async handleRefreshToken(
    adminId: number,
    refreshToken: string,
    res: Response
  ): Promise<ResponseFields> {
    // Adminni ma'lumotlar bazasidan topish
    const admin = await this.prisma.admin.findUnique({
      where: { id: +adminId },
    });

    // Agar admin topilmasa yoki refresh token bo'lmasa, xato qaytarish
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException("Admin aniqlanmadi");
    }

    // Berilgan refresh tokenni ma'lumotlar bazasidagi hashed token bilan taqqoslash
    const rMatches = await compare(refreshToken, admin.hashed_refresh_token);
    if (!rMatches) {
      throw new ForbiddenException("Kirishga ruxsat berilmaydi");
    }

    // JWTni tekshirish va dekodlash
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token muddati tugagan yoki noto'g'ri");
    }

    // Token ichidagi admin ID so'rovdagi admin ID bilan mosligini tekshirish
    if (adminId !== decodedToken.id) {
      throw new UnauthorizedException("Sizga ruxsat berilmagan");
    }

    // Yangi tokenlar yaratish
    const tokens = await this.generateTokens(admin);

    // Yangi refresh tokenni ma'lumotlar bazasida yangilash
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    // Yangi refresh tokenni cookie-ga saqlash
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.COOKIE_TIME,
    });

    // Yangi access token va admin IDni qaytarish
    return {
      id: admin.id,
      access_token: tokens.access_token,
    };
  }
  // async handleRefreshToken(refreshToken: string) {
  //   try {
  //     const payload = this.jwtService.verify(refreshToken, {
  //       secret: process.env.REFRESH_TOKEN_KEY,
  //     });

  //     const newAccessToken = await this.jwtService.signAsync(
  //       { userId: payload.userId },
  //       {
  //         secret: process.env.ACCESS_TOKEN_KEY,
  //         expiresIn: process.env.ACCESS_TOKEN_TIME,
  //       }
  //     );

  //     const newRefreshToken = await this.jwtService.signAsync(
  //       { userId: payload.userId },
  //       {
  //         secret: process.env.REFRESH_TOKEN_KEY,
  //         expiresIn: process.env.REFRESH_TOKEN_TIME,
  //       }
  //     );

  //     return {
  //       accessToken: newAccessToken,
  //       refreshToken: newRefreshToken,
  //     };
  //   } catch (error) {
  //     throw new Error("Invalid or expired refresh token");
  //   }
  // }

  async signOut(adminId: number, res: Response) {
    const admin = await this.prisma.admin.updateMany({
      where: {
        id: adminId,
        hashed_refresh_token: {
          not: null,
        },
      },
      data: { hashed_refresh_token: null },
    });

    if (!admin) {
      throw new ForbiddenException("Access Denied");
    }

    res.clearCookie("refresh_token");
    return {
      message: "Admin successfully signed out",
    };
  }
}
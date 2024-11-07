import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ConfirmPassportDataDto } from "./dto/confirm-password.data.dto";
import { User } from "@prisma/client";
import { AuthUserService } from "./user.auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserSigInDto } from "./dto";

@Controller("auth")
export class AuthClientController {
  constructor(private readonly authService:AuthUserService) {}

  @Post("signup")
  async signUp(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(res, createUserDto);
  }

  @Post("signin")
  async signIn(@Res() res: Response, @Body() userSigInDto: UserSigInDto) {
    return this.authService.signIn(res, userSigInDto);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post("refresh-token")
  async refreshToken(
    @Query("clientId") clientId: number,
    @Query("refreshToken") refreshToken: string,
    @Res() res: Response
  ) {
    return this.authService.handleRefreshToken(clientId, refreshToken, res);
  }

  @Post("signout")
  // @UseGuards(JwtAuthGuard) // Use a JWT guard if needed
  async signOut(@Query("clientId") clientId: number, @Res() res: Response) {
    return this.authService.userSignOut(clientId, res);
  }

  @Post("confirm-passport-data")
  // @UseGuards(JwtAuthGuard) // Use a JWT guard if needed
  async confirmPassportData(
    @Body() confirmPassportDataDto: ConfirmPassportDataDto
  ) {
    return this.authService.confirmPassportData(confirmPassportDataDto);
  }
}

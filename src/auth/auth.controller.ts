import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthSignInDto } from "./dto";
import { JwtPayloadWithRefreshToken, ResponseFields } from "../common/types";
import { GetCurentUser, GetCurentUserId, Public } from "../common/decorators";
import { CreateStaffDto } from "../staff/dto/create-staff.dto";
import { StaffAuthService } from "./staff.auth.service";
import { ApiTags } from "@nestjs/swagger";
import { AdminAuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@ApiTags("Admin Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AdminAuthService) {}
  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signUp(createAdminDto, res);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body()
    authSingInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signIn(authSingInDto, res);
  }

  @Public()
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  async handleRefreshToken(
    @GetCurentUserId() id: number,
    @GetCurentUser("refreshToken") refreshToken: string,
    @GetCurentUser() user: JwtPayloadWithRefreshToken,
    @Res({ passthrough: true })
    res: Response
  ): Promise<ResponseFields> {
    console.log(user);

    return this.authService.handleRefreshToken(id, refreshToken, res);
  }
  // @Post("refresh-token")
  // async handleRefreshToken(@Body("refreshToken") refreshToken: string) {
  //   try {
  //     const { accessToken, refreshToken: newRefreshToken } =
  //       await this.authService.handleRefreshToken(refreshToken);
  //     return {
  //       accessToken,
  //       refreshToken: newRefreshToken,
  //     };
  //   } catch (error) {
  //     throw new Error("Invalid or expired refresh token");
  //   }
  // }
  @Public()
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  async signOut(
    @GetCurentUserId() id: number,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.authService.signOut(+id, res);
  }
}

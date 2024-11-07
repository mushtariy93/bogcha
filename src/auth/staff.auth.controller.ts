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
import { AuthSignInDto,  } from "./dto";
import { JwtPayloadWithRefreshToken, ResponseFields } from "../common/types";
import { GetCurentUser, GetCurentUserId, Public } from "../common/decorators";
import { CreateStaffDto } from "../staff/dto/create-staff.dto";
import { StaffAuthService } from "./staff.auth.service";

@Controller("staffauth")
export class AuthStaffController {
  constructor(private readonly staffauthService: StaffAuthService) {}
  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() createstaffDto: CreateStaffDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.staffauthService.signUp(createstaffDto, res);
  }

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body()
    authSingInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.staffauthService.signIn(authSingInDto, res);
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

    return this.staffauthService.handleRefreshToken(id, refreshToken, res);
  }

  @Public()
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  async signOut(
    @GetCurentUserId() id: number,
    @Res({ passthrough: true })
    res: Response
  ) {
    return this.staffauthService.signOut(+id, res);
  }

  
}

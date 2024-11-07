import { IsNotEmpty, IsString } from "class-validator";

export class AuthStaffSignInDto {
  @IsString()
  // @IsNotEmpty()
  login: string;

  @IsString()
  // @IsNotEmpty()
  hashedPassword: string;
}

import { IsNotEmpty, IsString } from "class-validator";

export class AuthUserSignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
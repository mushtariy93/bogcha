import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class AdminSignInDto {
  @ApiProperty({
    description: "Admin email",
    example: "admin@gmail.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Admin strong password",
    example: "StrongPassword1!",
  })
  @IsStrongPassword({
    minLength: 4,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  hashedPassword: string;
}

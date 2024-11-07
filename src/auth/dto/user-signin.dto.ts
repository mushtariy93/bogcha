import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserSigInDto {
  @ApiProperty({
    description: "User email",
    example: "alisher@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: "User password",
    example: "alisher458!",
    minLength: 4,
    maxLength: 14,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. example: Alisher!1",
    }
  )
  password: string;
}

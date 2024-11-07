import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from "class-validator";
import { CreateChildDto } from "../../child/dto/create-child.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @ApiProperty({
    example: "Alisher",
    description: "Foydalanuvchining ismi",
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: "Yo`ldoshov",
    description: "Foydalanuvchining familiyasi",
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
    minLength: 3,
    maxLength: 50,
  })
  @IsPhoneNumber("UZ")
  phoneNumber: string;

  @ApiProperty({
    example: "alisher@example.com",
    description: "Foydalanuvchining elektron pochtasi",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "AB1234567",
    description: "Foydalanuvchining pasport ma'lumotlari",
  })
  @IsString()
  @IsNotEmpty()
  passportInfo: string;

  @ApiProperty({
    example: "Some Workplace",
    description: "Foydalanuvchining ishlash joyi",
    required: false,
  })
  @IsOptional()
  @IsString()
  workplace?: string;

  @ApiProperty({ description: "Foydalanuvchining roli" })
  @IsInt()
  roleId: number;

  @ApiProperty({
    example: "Kumush2020!",
    description: "User password",
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
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. example: Uzbeki$ston1",
    }
  )
  hashedPassword: string;

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
        "Confirm Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. example: Uzbeki$ston1",
    }
  )
  confirm_password: string;

  @ApiProperty({
    example: "hashedRefreshTokenHere",
    description: "Hash qilingan refresh token",
    required: false,
  })
  @IsOptional()
  @IsString()
  hashedRefreshToken?: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchining faoliyat holati",
  })
  @IsBoolean()
  is_active?: boolean;

  // // @IsInt()
  childId: number;

  @IsOptional()
  @IsArray()
  children?: CreateChildDto[];
}

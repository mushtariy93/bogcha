import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateRoleUserDto {
  @ApiProperty({
    example: "John",
    description: "Foydalanuvchining ismi",
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: "Doe",
    description: "Foydalanuvchining familiyasi",
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phoneNumber?: string;

  @ApiProperty({
    example: "johndoe@example.com",
    description: "Foydalanuvchining elektron pochtasi",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: "AB1234567",
    description: "Foydalanuvchining pasport ma'lumotlari",
    required: false,
  })
  @IsOptional()
  @IsString()
  passportInfo?: string;

  @ApiProperty({
    example: "Some Workplace",
    description: "Foydalanuvchining ishlash joyi",
    required: false,
  })
  @IsOptional()
  @IsString()
  workplace?: string;

  @ApiProperty({ description: "Foydalanuvchining roli", required: false })
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiProperty({
    example: "hashedPasswordHere",
    description: "Hash qilingan parol",
    required: false,
  })
  @IsOptional()
  @IsString()
  hashedPassword?: string;

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
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

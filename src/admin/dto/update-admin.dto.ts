import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
} from "class-validator";

export class UpdateAdminDto {
  @ApiProperty({
    description: "Adminning ismi",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Adminning login nomi",
    example: "johndoe",
    required: false,
  })
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty({
    description: "Adminning elektron pochta manzili",
    example: "johndoe@example.com",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Adminning tavsifi",
    example: "Senior Administrator",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Adminning faolligi (aktiv yoki noaktiv)",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: "Adminning tasdiqlangan paroli",
    example: "password123",
    required: false,
  })
  @IsOptional()
  @IsString()
  confirmPassword?: string;

  @ApiProperty({
    description: "Adminning roli ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiProperty({
    description: "Admin yaratish huquqi (tizim yaratuvchisi)",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCreator?: boolean;
}

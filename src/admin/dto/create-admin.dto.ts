import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Adminning ismi",
    example: "John Doe",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Adminning login nomi",
    example: "johndoe",
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: "Adminning elektron pochta manzili",
    example: "johndoe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Adminning telefon raqami",
    example: "j+998901234567",
  })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({
    description: "Adminning paroli (xashlanmagan)",
    example: "password123",
  })
  @IsString()
  hashedPassword: string;

  @ApiProperty({
    description: "Adminning tavsifi",
    example: "Senior Administrator",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Adminning tasdiqlangan paroli",
    example: "password123",
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: "Adminning roli ID",
    example: 1,
  })
  @IsInt()
  roleId: number;

  @ApiProperty({
    description: "Optional hashed refresh token for session management",
    required: false,
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;
  
  @ApiProperty({
    description: "Adminning faolligi (aktiv yoki noaktiv)",
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: "Admin yaratish huquqi (tizim yaratuvchisi)",
    example: false,
  })
  @IsBoolean()
  isCreator: boolean;
}

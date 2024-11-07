import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEmail,
  IsBoolean,
  IsInt,
} from "class-validator";

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  readonly first_name: string; // Ismi bo'yicha tekshirish

  @IsString()
  @IsNotEmpty()
  readonly last_name: string; // Familiyasi bo'yicha tekshirish

  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  readonly phone_number: string; // Telefon raqami bo'yicha tekshirish (UZ - O'zbekiston kodi)

  @IsNotEmpty()
  @IsString()
  readonly login: string; // Login bo'yicha tekshirish

  @IsString()
  @IsOptional()
  hashedPassword: string; // Parol bo'yicha tekshirish (ixtiyoriy)

  @IsString()
  @IsOptional()
  confirm_password: string; // Parolni tasdiqlash (ixtiyoriy)

  @IsNotEmpty()
  @IsString()
  readonly role: string; // Rol bo'yicha tekshirish (ixtiyoriy)

  // Agar email maydoni kerak bo'lsa, quyidagi qoidani qo'shish mumkin
  @IsOptional()
  @IsEmail()
  readonly email?: string; // Email bo'yicha tekshirish (ixtiyoriy)

  // Agar roleId integer (raqam) bo'lsa:
  @IsOptional()
  @IsInt()
  readonly roleId?: number; // Rol ID bo'yicha tekshirish (ixtiyoriy)

  // Agar isActive boolean bo'lsa:
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean; // Aktivligini tekshirish (ixtiyoriy)

  // Agar isCreator boolean bo'lsa:
  @IsOptional()
  @IsBoolean()
  readonly isCreator?: boolean; // Yaratganligini tekshirish (ixtiyoriy)
}

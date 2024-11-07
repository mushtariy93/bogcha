import { IsInt, IsOptional, IsString } from "class-validator";
import { CreateChildDto } from "../../child/dto/create-child.dto";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  passportInfo?: string;

  @IsOptional()
  @IsString()
  workplace?: string;

  @IsOptional()
  @IsInt()
  roleId?: number;

  @IsOptional()
  @IsString()
  hashedPassword?: string;

  @IsOptional()
  @IsString()
  confirm_password?: string;

  @IsOptional()
  @IsString()
  hashedRefreshToken?: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  children?: CreateChildDto[]; // Bolalar ro'yxati
}

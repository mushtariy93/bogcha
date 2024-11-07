import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
} from "class-validator";

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  childId?: number;

  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  paymentType?: string;

  @IsOptional()
  @IsBoolean()
  is_paid?: boolean;
}

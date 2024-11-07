import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";


export class ConfirmPassportDataDto {
  @ApiProperty({
    description:
      'Passport number must start with two uppercase letters followed by seven digits.',
    example: 'AB1234567',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{2}\d{7}$/, {
    message:
      'Passport number must start with two uppercase letters followed by seven digits.',
  })
  passport_number: string;

  @ApiProperty({
    description: 'Birth date in YYYY-MM-DD format.',
    example: '1990-01-01',
  })
  @IsString()
  @IsDateString()
  @IsNotEmpty()
  birth_date: string;

  @ApiProperty({
    description: 'Passport issue date in YYYY-MM-DD format.',
    example: '2020-01-01',
  })
  @IsString()
  @IsDateString()
  @IsNotEmpty()
  passport_issue_date: string;

  @ApiProperty({
    description: 'Passport expiry date in YYYY-MM-DD format.',
    example: '2030-01-01',
  })
  @IsString()
  @IsDateString()
  @IsNotEmpty()
  passport_expiry_date: string;

  @ApiProperty({
    description: 'Client phone number in Uzbekistan format.',
    example: '+998901234567',
  })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone_number: string;
}

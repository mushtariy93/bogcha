import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Otp code',
    example: '8888',
  })
  @IsString()
  otp: string;

  @ApiProperty({
    description: 'User Email',
    example: 'alisher@gmail.com',
  })
  @IsEmail()
  email: string;
}

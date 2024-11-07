import { IsInt, IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The price of the payment',
    example: 100.5,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The ID of the child related to the payment',
    example: 2,
  })
  @IsInt()
  childId: number;

  @ApiProperty({
    description: 'The date when the payment was made',
    example: '2024-11-01',
  })
  @IsDateString()
  paymentDate: Date;

  @ApiProperty({
    description: 'The method of payment (e.g., Credit Card, PayPal)',
    example: 'Credit Card',
  })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    description: 'The type of payment (e.g., Tuition, Extra Activities)',
    example: 'Tuition',
  })
  @IsString()
  paymentType: string;

  @ApiProperty({
    description: 'Indicates if the payment has been completed',
    example: true,
  })
  @IsBoolean()
  is_paid: boolean;
}



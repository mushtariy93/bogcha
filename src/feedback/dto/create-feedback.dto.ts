import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import {UserType} from '@prisma/client'
export class CreateFeedbackDto {
  @ApiProperty({ example: 1, description: " user Feedback identifikatori" })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: "User type",
    description: "UserType 'admin','child','staff",
  })
  @IsEnum(UserType)
  userType:UserType;

  @ApiProperty({
    example: "The teacher was very attentive and supportive.",
    description: "Feedback matni",
  })
  content: string;

  @ApiProperty({
    example: "2023-01-01T12:00:00Z",
    description: "Feedback yaratilgan sana",
  })
  @IsString()
  @IsNotEmpty()
  created_at: Date;
}





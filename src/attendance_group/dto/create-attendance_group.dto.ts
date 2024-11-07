
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceGroupDto {
  @ApiProperty({ description: "Child ID", example: 1 })
  @IsInt()
  @IsNotEmpty()
  childId: number;

  @ApiProperty({ description: "Group ID", example: 1 })
  @IsInt()
  @IsNotEmpty()
  groupId: number;

  @ApiProperty({ description: "Date", example: "2024-11-01" })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: "Check-in Time", example: "09:00 AM" })
  @IsString()
  @IsNotEmpty()
  check_in_time: string;

  @ApiProperty({ description: "Check-out Time", example: "05:00 PM" })
  @IsString()
  @IsNotEmpty()
  check_up_time: string;
}


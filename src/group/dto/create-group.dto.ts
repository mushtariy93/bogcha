import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
  @ApiProperty({ description: "Group name", example: "G`uncha" })
  @IsString()
  group_name: string;
  @ApiProperty({
    description: "Group age_range",
    example: "5-6 yoshlar orasida",
  })
  @IsString()
  age_range: string;
  @ApiProperty({
    description: "Group max_capacity",
    example: "30ta bolajonlar uchun",
  })
  @IsString()
  max_capacity: string;
  @ApiProperty({ description: "Group building_number", example: "A" })
  @IsString()
  building_number: string;
  @ApiProperty({ description: "Group room_number", example: "A-5" })
  @IsString()
  room_number: string;
  @ApiProperty({ description: "Group room_floor", example: "2-qavatda" })
  @IsNumber()
  room_floor: number;
  @ApiProperty({ description: "Group active", example: "true" })
  @IsBoolean()
  is_active: boolean;
  @ApiProperty({ description: "StaffId", example: "1" })
  @IsNumber()
  staffId: number;

  
}

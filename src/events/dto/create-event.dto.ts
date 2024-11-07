import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateEventDto {
  @ApiProperty({ description: "Events titel", example: "Hosil bayrami" })
  @IsString()
  titel: string;
  @ApiProperty({
    description: "Events description",
    example: "Hosil bayrami Kuz faslida nishonlanadigan bayram hisoblanadi",
  })
  @IsString()
  desciption: string;
  @ApiProperty({
    description: "In which group the holiday is taking place",
    example: "8-guruh",
  })
  @IsNumber()
  groupId: number;
  @ApiProperty({ description: "Events days", example: "2024-11-04" })
  @IsString()
  created_at: string;
  @ApiProperty({
    description: "a state of celebration",
    example: "Bo`ladi",
  })
  @IsString()
  status: string;
}

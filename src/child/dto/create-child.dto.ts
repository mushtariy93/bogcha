import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateChildDto {
  // @ApiProperty({ description: "child id", example: "1" })
  // @IsNumber()
  // id: number;
  @ApiProperty({ description: "child firstname", example: "Jasur" })
  @IsString()
  firstName: string;
  @ApiProperty({ description: "child lastname", example: "Tursunov" })
  @IsString()
  lastName: string;
  @ApiProperty({ description: "child birthDate", example: "2020-05-15" })
  @IsString()
  birthDate: string;
  @ApiProperty({ description: "child gender", example: "Male" })
  @IsString()
  gender: string;
  @ApiProperty({ description: "child photo", example: "child.pgh" })
  @IsString()
  photo: string;
  @ApiProperty({ description: "child group", example: "1" })
  @IsNumber()
  groupId: number;

  @ApiProperty({
    example: 1,
    description: "Bolani IDsi",
  })
  // @IsInt()
  childId: number;
}

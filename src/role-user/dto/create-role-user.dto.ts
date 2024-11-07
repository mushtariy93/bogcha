import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleUserDto {
  @ApiProperty({ description: "Rol nomi", example: "Father" })
  @IsString()
  @IsNotEmpty()
  name: string;
}



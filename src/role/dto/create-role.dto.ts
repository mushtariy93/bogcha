import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ description: "Rol nomi", example: "Admin" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

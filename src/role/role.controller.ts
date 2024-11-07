import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto, UpdateRoleDto } from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Roles")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiOperation({ summary: "Adding new StaffRole" })
  @ApiResponse({
    status: 200,
    description: "Adding new StaffRole",
    type: "StaffRole",
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Get All StaffRole" })
  @ApiResponse({
    status: 200,
    description: "Get All staffRole",
    type: "StaffRole",
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "Get By Id StaffRole" })
  @ApiResponse({
    status: 200,
    description: "Get By Id staffRole",
    type: "StaffRole",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Get("find/:name")
  async findByName(@Param("name") name: string) {
    return this.roleService.findByName(name);
  }


  @ApiOperation({ summary: "Patch By Id StaffRole" })
  @ApiResponse({
    status: 200,
    description: "Patch By Id StaffRole",
    type: "StaffRole",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "Delete By Id StaffRole" })
  @ApiResponse({
    status: 200,
    description: "Delete By Id StaffRole",
    type: "StaffRole",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(+id);
  }
}

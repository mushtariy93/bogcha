import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { CreateRoleUserDto } from './dto/create-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Role-user")
@Controller("role-user")
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}
  @ApiOperation({ summary: "Adding new userRole" })
  @ApiResponse({
    status: 200,
    description: "Adding new userRole",
    type: "UserRole",
  })
  @Post()
  create(@Body() createRoleUserDto: CreateRoleUserDto) {
    return this.roleUserService.create(createRoleUserDto);
  }

  @ApiOperation({ summary: "Get All userRole" })
  @ApiResponse({
    status: 200,
    description: "Get All userRole",
    type: "UserRole",
  })
  @Get()
  findAll() {
    return this.roleUserService.findAll();
  }

  @ApiOperation({ summary: "Get By Id userRole" })
  @ApiResponse({
    status: 200,
    description: "Get By Id userRole",
    type: "userRole",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleUserService.findOne(+id);
  }

  @ApiOperation({ summary: "Patch By Id userRole" })
  @ApiResponse({
    status: 200,
    description: "Patch By Id userRole",
    type: "userRole",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRoleUserDto: UpdateRoleUserDto
  ) {
    return this.roleUserService.update(+id, updateRoleUserDto);
  }

  @ApiOperation({ summary: "Delete By Id userRole" })
  @ApiResponse({
    status: 200,
    description: "Delete By Id StaffRole",
    type: "userRole"
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleUserService.remove(+id);
  }
}

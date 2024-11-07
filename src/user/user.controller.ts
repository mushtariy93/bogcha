import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("User") // Swaggerda bu controllerni 'User' deb nomlash
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Create a new user" }) // Endpointning qisqacha tavsifi
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
  }) // Response ma'lumotlari
  @ApiResponse({ status: 400, description: "Bad Request." })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get all users" }) // Endpointni tavsifi
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved the list of users.",
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Get user by ID" }) // Endpointni tavsifi
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved the user by ID.",
  })
  @ApiResponse({ status: 404, description: "User not found." })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }
// @ApiOperation({ summary: 'Update user by ID' }) // Endpointni tavsifi
// @ApiResponse({ status: 200, description: 'Successfully updated the user.' })
// @ApiResponse({ status: 400, description: 'Bad Request.' })
// @ApiResponse({ status: 404, description: 'User not found.' })
// @Patch(':id')
// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   return this.userService.update(+id, updateUserDto);
  @ApiOperation({ summary: "Delete user by ID" }) // Endpointni tavsifi
  @ApiResponse({ status: 200, description: "Successfully deleted the user." })
  @ApiResponse({ status: 404, description: "User not found." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}

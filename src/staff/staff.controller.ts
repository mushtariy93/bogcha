import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Staff") 
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: "Add a new staff member" }) 
  @ApiResponse({
    status: 201,
    description: "Successfully created a new staff member", 
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request", 
  })
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: "Get all staff members" }) 
  @ApiResponse({
    status: 200,
    description: "List of all staff members", 
  })
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: "Get a staff member by ID" }) 
  @ApiResponse({
    status: 200,
    description: "Staff member found", 
  })
  @ApiResponse({
    status: 404,
    description: "Staff member not found", 
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a staff member's details" }) 
  @ApiResponse({
    status: 200,
    description: "Successfully updated the staff member", 
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request", // Error response if the request is malformed
  })
  @ApiResponse({
    status: 404,
    description: "Staff member not found", 
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({ summary: "Delete a staff member by ID" }) 
  @ApiResponse({
    status: 200,
    description: "Successfully deleted the staff member", 
  })
  @ApiResponse({
    status: 404,
    description: "Staff member not found", 
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }
}

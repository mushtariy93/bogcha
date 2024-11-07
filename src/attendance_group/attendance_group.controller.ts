import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AttendanceGroupService } from "./attendance_group.service";
import { CreateAttendanceGroupDto } from "./dto/create-attendance_group.dto";
import { UpdateAttendanceGroupDto } from "./dto/update-attendance_group.dto";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";

@ApiTags("Attendance Group")
@Controller("attendance-group")
export class AttendanceGroupController {
  constructor(
    private readonly attendanceGroupService: AttendanceGroupService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create an attendance group" })
  @ApiResponse({
    status: 201,
    description: "The attendance group has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid input." })
  create(@Body() createAttendanceGroupDto: CreateAttendanceGroupDto) {
    return this.attendanceGroupService.create(createAttendanceGroupDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all attendance groups" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all attendance groups.",
  })
  findAll() {
    return this.attendanceGroupService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a specific attendance group by ID" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved the attendance group.",
  })
  @ApiResponse({ status: 404, description: "Attendance group not found." })
  findOne(@Param("id") id: string) {
    return this.attendanceGroupService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a specific attendance group by ID" })
  @ApiResponse({
    status: 200,
    description: "The attendance group has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Attendance group not found." })
  update(
    @Param("id") id: string,
    @Body() updateAttendanceGroupDto: UpdateAttendanceGroupDto
  ) {
    return this.attendanceGroupService.update(+id,updateAttendanceGroupDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a specific attendance group by ID" })
  @ApiResponse({
    status: 200,
    description: "The attendance group has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Attendance group not found." })
  remove(@Param("id") id: string) {
    return this.attendanceGroupService.remove(+id);
  }
}

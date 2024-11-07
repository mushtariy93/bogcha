import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SchwdulesService } from "./schwdules.service";
import { CreateSchwduleDto } from "./dto/create-schwdule.dto";
import { UpdateSchwduleDto } from "./dto/update-schwdule.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Schedules") 
@Controller("schwdules")
export class SchwdulesController {
  constructor(private readonly schwdulesService: SchwdulesService) {}

  @ApiOperation({ summary: "Create a new schedule" }) 
  @ApiResponse({
    status: 201,
    description: "The schedule has been successfully created.",
  }) 
  @ApiResponse({ status: 400, description: "Bad Request." }) 
  @Post()
  create(@Body() createSchwduleDto: CreateSchwduleDto) {
    return this.schwdulesService.create(createSchwduleDto);
  }

  @ApiOperation({ summary: "Get all schedules" }) 
  @ApiResponse({ status: 200, description: "List of all schedules." }) 
  @Get()
  findAll() {
    return this.schwdulesService.findAll();
  }

  @ApiOperation({ summary: "Get a schedule by ID" }) 
  @ApiResponse({
    status: 200,
    description: "The schedule with the specified ID.",
  })
  @ApiResponse({ status: 404, description: "Schedule not found." }) 
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.schwdulesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a schedule by ID" }) 
  @ApiResponse({
    status: 200,
    description: "The schedule has been successfully updated.",
  }) 
  @ApiResponse({ status: 400, description: "Bad Request." }) 
  @ApiResponse({ status: 404, description: "Schedule not found." }) 
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSchwduleDto: UpdateSchwduleDto
  ) {
    return this.schwdulesService.update(+id, updateSchwduleDto);
  }

  @ApiOperation({ summary: "Delete a schedule by ID" }) 
  @ApiResponse({
    status: 200,
    description: "The schedule has been successfully deleted.",
  }) 
  @ApiResponse({ status: 404, description: "Schedule not found." }) 
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.schwdulesService.remove(+id);
  }
}

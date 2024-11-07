import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Child")
@Controller("child")
export class ChildController {
  constructor(private readonly childService: ChildService) {}
  @ApiOperation({ summary: "Adding new child " })
  @ApiResponse({
    status: 201,
    description: "Created new child",
  })
  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childService.create(createChildDto);
  }
  @ApiOperation({ summary: "Get All children " })
  @ApiResponse({
    status: 200,
    description: "List of children",
  })
  @Get()
  findAll() {
    return this.childService.findAll();
  }
  @ApiOperation({ summary: "Get Id Child " })
  @ApiResponse({
    status: 200,
    description: "Child fetched by Id successfully",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.childService.findOne(+id);
  }
  @ApiOperation({ summary: "Patch child By Id  " })
  @ApiResponse({
    status: 200,
    description: "Patch child By Id ",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childService.update(+id, updateChildDto);
  }
  @ApiOperation({ summary: "Delate child By Id  " })
  @ApiResponse({
    status: 200,
    description: "Delate  child By Id ",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.childService.remove(+id);
  }
}

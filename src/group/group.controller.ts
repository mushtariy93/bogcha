import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { group } from 'console';

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @ApiOperation({ summary: "Adding new group" })
  @ApiResponse({
    status: 200,
    description: "Adding new group",
    type: group,
  })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: "Get All group" })
  @ApiResponse({
    status: 200,
    description: "Get All group",
    type: group,
  })
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: "Get By Id group" })
  @ApiResponse({
    status: 200,
    description: "Get By Id group",
    type: group,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
  }
  @ApiOperation({ summary: "Patch By Id group" })
  @ApiResponse({
    status: 200,
    description: "Patch By Id group",
    type: group,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }
  @ApiOperation({ summary: "Delete By Id group" })
  @ApiResponse({
    status: 200,
    description: "Delete By Id group",
    type: group,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.groupService.remove(+id);
  }
}

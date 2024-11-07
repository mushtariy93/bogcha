import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: "Adding new events" })
  @ApiResponse({
    status: 201,
    description: "Created new events",
    type: "Events",
  })
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
  @ApiOperation({ summary: "Get All events" })
  @ApiResponse({
    status: 200,
    description: "Get All events",
  })
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
  @ApiOperation({ summary: "Get By id events" })
  @ApiResponse({
    status: 200,
    description: "Get By Id events",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: "Patch By id events" })
  @ApiResponse({
    status: 200,
    description: "Patch By Id events",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: "Delete By id events" })
  @ApiResponse({
    status: 200,
    description: "Delete By Id events",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventsService.remove(+id);
  }
}

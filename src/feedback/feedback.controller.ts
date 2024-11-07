import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Feedback")
@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  @ApiOperation({ summary: "Adding new feedbeck" })
  @ApiResponse({
    status: 201,
    description: "Created new feedbeck",
    type: "Feedbeck",
  })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
  @ApiOperation({ summary: "Get All feedbeck" })
  @ApiResponse({
    status: 200,
    description: "Get All feedbeck",
  })
  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @ApiOperation({ summary: "Get By id feedbeck" })
  @ApiResponse({
    status: 200,
    description: "Get By Id feedbeck",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.feedbackService.findOne(+id);
  }

  @ApiOperation({ summary: "Patch By id feedback" })
  @ApiResponse({
    status: 200,
    description: "Patch By Id feedbeck",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @ApiOperation({ summary: "Delete By id feedbeck" })
  @ApiResponse({
    status: 200,
    description: "Delete By Id feedbeck",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.feedbackService.remove(+id);
  }
}

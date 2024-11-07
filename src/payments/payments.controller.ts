import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({
    status: 201,
    description: "The payment has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, description: "Successfully retrieved payments." })
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a payment by id" })
  @ApiResponse({ status: 200, description: "Successfully retrieved payment." })
  @ApiResponse({ status: 404, description: "Payment not found." })
  async findOne(@Param("id",ParseIntPipe) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a payment" })
  @ApiResponse({
    status: 200,
    description: "Successfully updated the payment.",
  })
  @ApiResponse({ status: 404, description: "Payment not found." })
  async update(
    @Param("id") id: number,
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a payment" })
  @ApiResponse({
    status: 200,
    description: "The payment has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Payment not found." })
  async remove(@Param("id") id: number) {
    return this.paymentsService.remove(id);
  }
}

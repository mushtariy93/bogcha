import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { winstonConfig } from "src/logger/logger"; // Loggerni import qilish

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Yangi to'lov yaratish
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.prismaService.payments.create({
        data: {
          ...createPaymentDto,
        },
      });

      // Log yozish
      winstonConfig.info(`Yangi to'lov yaratildi: ${payment.id}`, {
        paymentData: createPaymentDto,
      });

      return payment;
    } catch (error) {
      winstonConfig.error(
        `To'lov yaratishda xatolik: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // Barcha to'lovlarni olish
  async findAll() {
    try {
      const payments = await this.prismaService.payments.findMany({
        include: { child: true },
      });

      // Log yozish
      winstonConfig.info(
        `Barcha to'lovlar olish: ${payments.length} ta to'lov`,
        {
          paymentsCount: payments.length,
        }
      );

      return payments;
    } catch (error) {
      winstonConfig.error(
        `Barcha to'lovlarni olishda xatolik: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // To'lovni ID bo'yicha olish
  async findOne(id: number) {
    try {
      const payment = await this.prismaService.payments.findUnique({
        where: { id },
        include: { child: true },
      });

      if (!payment) {
        winstonConfig.warn(`To'lov topilmadi: ${id}`);
        return null;
      }

      // Log yozish
      winstonConfig.info(`To'lov topildi: ${id}`, {
        paymentDetails: payment,
      });

      return payment;
    } catch (error) {
      winstonConfig.error(
        `To'lovni olishda xatolik: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // To'lovni yangilash
  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.prismaService.payments.update({
        where: { id },
        data: updatePaymentDto,
      });

      // Log yozish
      winstonConfig.info(`To'lov yangilandi: ${payment.id}`, {
        paymentData: updatePaymentDto,
      });

      return payment;
    } catch (error) {
      winstonConfig.error(
        `To'lovni yangilashda xatolik: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // To'lovni o'chirish
  async remove(id: number) {
    try {
      const payment = await this.prismaService.payments.delete({
        where: { id },
      });

      // Log yozish
      winstonConfig.info(`To'lov o'chirildi: ${payment.id}`, {
        paymentId: id,
      });

      return payment;
    } catch (error) {
      winstonConfig.error(
        `To'lovni o'chirishda xatolik: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }
}

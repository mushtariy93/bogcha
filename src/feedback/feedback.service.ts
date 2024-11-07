import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UserType } from "@prisma/client";
import { winstonConfig } from "../logger/logger"; // loggerni import qilish

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}

  // Feedback yaratish
  async create(createFeedbackDto: CreateFeedbackDto) {
    const { userId, userType } = createFeedbackDto;

    let userExists;

    if (userType === UserType.Admin) {
      userExists = await this.prismaService.admin.findUnique({
        where: { id: userId },
      });
    } else if (userType === UserType.User) {
      userExists = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
    } else if (userType === UserType.Staff) {
      userExists = await this.prismaService.staff.findUnique({
        where: { id: userId },
      });
    }

    if (!userExists) {
      winstonConfig.error(
        `Feedback creation failed. User not found: ${userId}`
      );
      throw new BadRequestException("Foydalanuvchi topilmadi");
    }

    winstonConfig.info(
      `Feedback created for userId: ${userId} with content: ${createFeedbackDto.content}`
    );

    return this.prismaService.feedback.create({
      data: {
        userId: createFeedbackDto.userId,
        content: createFeedbackDto.content,
        created_at: new Date(),
        userType: createFeedbackDto.userType,
      },
    });
  }

  // Barcha feedbacklarni olish
  async findAll() {
    winstonConfig.info("Fetching all feedbacks");

    return this.prismaService.feedback.findMany({
      include: {
        user: true,
      },
    });
  }

  // Maxsus feedbackni olish
  async findOne(id: number) {
    winstonConfig.info(`Fetching feedback with id: ${id}`);

    return this.prismaService.feedback.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  // Feedbackni yangilash
  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedbackExists = await this.prismaService.feedback.findUnique({
      where: { id },
    });

    if (!feedbackExists) {
      winstonConfig.error(
        `Feedback update failed. Feedback not found with id: ${id}`
      );
      throw new BadRequestException("Feedback topilmadi");
    }

    winstonConfig.info(`Updating feedback with id: ${id}`);

    return this.prismaService.feedback.update({
      where: { id },
      data: {
        content: updateFeedbackDto.content,
        updated_at: new Date(),
      },
    });
  }

  // Feedbackni o‘chirish
  async remove(id: number) {
    const feedbackExists = await this.prismaService.feedback.findUnique({
      where: { id },
    });

    if (!feedbackExists) {
      winstonConfig.error(
        `Feedback removal failed. Feedback not found with id: ${id}`
      );
      throw new BadRequestException("Feedback topilmadi");
    }

    winstonConfig.info(`Removing feedback with id: ${id}`);

    return this.prismaService.feedback.delete({
      where: { id },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "@prisma/client";

@Injectable()
export class MailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {}

  // async sendUserConfirmation(user: User, token: string) {
  //   const confirmationUrl = `https://your-website.com/confirm?token=${token}`; // Tasdiqlash havolasi

  async sendMail(user: User, myotp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to online booking card',
      template: './confirm',
      context: {
        first_name: user.firstName,
        myotp,
      },
    });
  }
  }


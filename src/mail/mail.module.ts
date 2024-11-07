import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailService } from "./mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"; // HandlebarsAdapter import qilindi
import { join } from "path";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: `Sahih bolalr bogchasi ${config.get<string>("SMTP_HOST")}`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(), 
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, PrismaService],
  exports: [MailService],
})
export class MailModule {}

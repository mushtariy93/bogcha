import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { winstonConfig } from './logger/logger';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    // app.use(cookieParser());

    // cookieParser middleware'ini qo'shish
    app.use(cookieParser());

    // NestJS ilovasiga winston loggerini o'rnatish
    app.useLogger(winstonConfig); // winston logger'ini qo'llash

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("/api");
    const config = new DocumentBuilder()
      .setTitle("Sahih bolalar bog`chasi project")
      .setDescription("Sahih bolalar bog`chasi  project ReS API")
      .setVersion("1.0")
      .addTag("NestJs,validation,swagger,guard,prisma,pg,mailer,sms,cookei")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

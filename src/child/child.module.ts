import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ChildController],
  providers: [ChildService],
  imports:[PrismaModule],
})
export class ChildModule {}

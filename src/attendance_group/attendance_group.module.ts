import { Module } from '@nestjs/common';
import { AttendanceGroupService } from './attendance_group.service';
import { AttendanceGroupController } from './attendance_group.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AttendanceGroupController],
  providers: [AttendanceGroupService,PrismaService],
})
export class AttendanceGroupModule {}

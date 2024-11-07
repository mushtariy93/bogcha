import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from '../role/role.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, RoleService],
  exports: [AdminService],
})
export class AdminModule {}

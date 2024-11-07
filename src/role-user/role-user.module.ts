import { Module } from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { RoleUserController } from './role-user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RoleUserController],
  providers: [RoleUserService,PrismaService],
  // imports: [PrismaModule],
})
export class RoleUserModule {}

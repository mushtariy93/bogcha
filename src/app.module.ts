import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';
import { RoleModule } from './role/role.module';
import { GroupModule } from './group/group.module';
import { ChildModule } from './child/child.module';
import { UserModule } from './user/user.module';
import { PaymentsModule } from './payments/payments.module';
import { SchwdulesModule } from './schwdules/schwdules.module';
import { AttendanceGroupModule } from './attendance_group/attendance_group.module';
import { EventsModule } from './events/events.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RoleUserModule } from './role-user/role-user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    AuthModule,
    StaffModule,
    RoleModule,
    GroupModule,
    ChildModule,
    UserModule,
    
    PaymentsModule,
    SchwdulesModule,
    AttendanceGroupModule,
    EventsModule,
    FeedbackModule,
    RoleUserModule,
    AdminModule,

  
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

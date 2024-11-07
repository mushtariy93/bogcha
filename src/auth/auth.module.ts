import { Module } from "@nestjs/common";
import { JwtModule} from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module"; 

import { StaffModule } from "../staff/staff.module";
import { AdminModule } from "../admin/admin.module";
import { AdminAuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthStaffController } from "./staff.auth.controller";
import { StaffAuthService } from "./staff.auth.service";


  @Module({
    imports: [
      PrismaModule,
      JwtModule.register({}),
      StaffModule,
      AdminModule,
      AuthModule,
    ],
    controllers: [AuthController, AuthStaffController],
    providers: [AdminAuthService, StaffAuthService],
  })
  export class AuthModule {}

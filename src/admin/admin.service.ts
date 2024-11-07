import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import { RoleService } from "../role/role.service";
import { hash } from "bcrypt";
import { winstonConfig } from "src/logger/logger"; // Loggerni import qilish

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: {
          email: createAdminDto.email,
        },
      });
      const old_admin = await this.prismaService.admin.findUnique({
        where: { login: createAdminDto.login },
      });
      if (admin || old_admin) {
        winstonConfig.warn("Admin mavjud", {
          email: createAdminDto.email,
          login: createAdminDto.login,
        });

        throw new ForbiddenException("Admin already exists");
      }
      const role = await this.roleService.findOne(createAdminDto.roleId);

      if (!role) {
        winstonConfig.warn("Role topilmadi", {
          roleId: createAdminDto.roleId,
        });

        throw new NotFoundException("Role not found");
      }

      const hashedPassword = await hash(createAdminDto.hashedPassword, 7);
      const newadmin = await this.prismaService.admin.create({
        data: {
          name: createAdminDto.name,
          login: createAdminDto.login,
          email: createAdminDto.email,
          phone_number: createAdminDto.phone_number,
          hashedPassword: hashedPassword,
          description: createAdminDto.description,
          confirmPassword: createAdminDto.confirmPassword,
          role: {
            connect: { id: createAdminDto.roleId },
          },
          isActive: createAdminDto.isActive || false,
          isCreator: createAdminDto.isCreator || false,
        },
        include: {
          role: true,
        },
      });
      winstonConfig.info(`Yangi admin yaratiladi:${newadmin.id}`, {
        adminData: newadmin,
      });

      return newadmin;
    } catch (error) {
      winstonConfig.error("Admin yaratishda xatolik:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async findAll() {
    try {
      const admins = await this.prismaService.admin.findMany({
        include: { role: true },
      });
      winstonConfig.info(`Barcha adminlar olindi: ${admins.length} ta admin`);
      return admins;
    } catch (error) {
      winstonConfig.error("Barcha adminlarni olishda xatolik:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: { id },
        include: { role: true },
      });
      if (!admin) {
        winstonConfig.warn(`Admin topilmadi: ${id}`);
        return null;
      }
      winstonConfig.info(`Admin topildi: ${id}`, { adminDetails: admin });
      return admin;
    } catch (error) {
      winstonConfig.error(
        `Adminni ID bo'yicha olishda xatolik: ${error.message}`,
        { stack: error.stack }
      );
      throw error;
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const updatedAdmin = await this.prismaService.admin.update({
        where: { id },
        data: updateAdminDto,
      });
      winstonConfig.info(`Admin yangilandi: ${updatedAdmin.id}`, {
        updatedData: updateAdminDto,
      });
      return updatedAdmin;
    } catch (error) {
      winstonConfig.error(`Adminni yangilashda xatolik: ${error.message}`, {
        stack: error.stack,
      });
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedAdmin = await this.prismaService.admin.delete({
        where: { id },
      });
      winstonConfig.info(`Admin o'chirildi: ${deletedAdmin.id}`);
      return deletedAdmin;
    } catch (error) {
      winstonConfig.error(`Adminni o'chirishda xatolik: ${error.message}`, {
        stack: error.stack,
      });
      throw error;
    }
  }
}

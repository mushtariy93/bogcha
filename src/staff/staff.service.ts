import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffService {
  constructor(private readonly prismaServise: PrismaService) {}
  async create(createStaffDto: CreateStaffDto) {
    const candidate = await this.prismaServise.staff.findUnique({
      where: { login: createStaffDto.login },
    });

    if (candidate) {
      throw new BadRequestException({
        message: "User with this login already exists",
      });
    }
    const role = await this.prismaServise.roles.findUnique({
      where: {
        name: createStaffDto.role,
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found");
    }
    if (createStaffDto.hashedPassword !== createStaffDto.confirm_password) {
      throw new BadRequestException("The password does not match");
    }
    const hashed_password = await bcrypt.hash(createStaffDto.hashedPassword, 7);
    const newUser = await this.prismaServise.staff.create({
      data: {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        phone_number: createStaffDto.phone_number,
        login: createStaffDto.login,
        hashed_password: hashed_password,
        roles: {
          create: [{ roleId: role.id }],
        },
      },
    });
    return newUser;
  }

  findAll() {
    return this.prismaServise.staff.findMany({
      include: {
        roles: {
          include: { role: true },
        },
        GroupStaff: {
          include: { group: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaServise.staff.findUnique({
      where: { id },
      include: {
        roles: {
          include: { role: true },
        },
        GroupStaff: {
          include: { group: true },
        },
      },
    });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prismaServise.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  remove(id: number) {
    return this.prismaServise.staff.delete({ where: { id } });
  }
}
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prismaservice: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.prismaservice.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (oldUser) {
      throw new NotFoundException("User already exists");
    }

    if (createUserDto.hashedPassword !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await hash(createUserDto.hashedPassword, 7);

    const newUser = await this.prismaservice.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phoneNumber: createUserDto.phoneNumber,
        email: createUserDto.email,
        passportInfo: createUserDto.passportInfo,
        workplace: createUserDto.workplace,
        roleId: createUserDto.roleId,
        hashedPassword,
        is_active: createUserDto.is_active,
        children: {
          create: createUserDto.children?.map((child) => ({
            child: { connect: { id: child.childId } },
          })),
        },
      },
      include: {
        children: {
          include: { child: true },
        },
      },
    });
    return newUser;
  }

  findAll() {
    return this.prismaservice.user.findMany({
      include: {
        children: {
          include: { child: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaservice.user.findUnique({
      where: { id },
      include: {
        role: true,
        children: true,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.prismaservice.user.update({
  //     where: { id },
  //     data: updateUserDto,
  //   });
  // }

  remove(id: number) {
    return this.prismaservice.user.delete({ where: { id } });
  }
}

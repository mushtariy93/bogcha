import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateChildDto } from "./dto/create-child.dto";
import { UpdateChildDto } from "./dto/update-child.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChildService {
  constructor(
    private readonly prismaService: PrismaService,
  
  ) {}
  async create(createChildDto: CreateChildDto) {
   const existingChild = await this.prismaService.child.findFirst({
    where: {
      firstName: createChildDto.firstName,
      lastName: createChildDto.lastName,
      birthDate: createChildDto.birthDate,
    },
  });

  if (existingChild) {
    throw new BadRequestException('Bola allaqachon mavjud');
  }

  return this.prismaService.child.create({
    data: createChildDto,
  });
}
  

  findAll() {
    return this.prismaService.child.findMany({
      include: {
        user: {
          include: {
            User: true,
          },
        },
        payments: true, 
        attendance_group: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.child.findUnique({
      where: { id },
      include: {
        user: true,
        payments: true,
        attendance_group: true,
      },
    });
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.prismaService.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  remove(id: number) {
    return this.prismaService.child.delete({ where: { id } });
  }
}

import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({ data: { name: createRoleDto.name } });
  }

  findAll() {
    return this.prisma.roles.findMany({
      include: {
        staffs: {
          include: {
            staff: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.roles.findUnique({ where: { id } });
  }
  findByName(name: string){
    return this.prisma.roles.findUnique({
      where: { name: name.toUpperCase() }, 
    });
  }
  
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({
      where: { id },
      data: { name: updateRoleDto.name },
    });
  }

  remove(id: number) {
    return this.prisma.roles.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRoleUserDto } from './dto/create-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleUserService {
  constructor(private readonly prismaService:PrismaService){}
  create(createRoleUserDto: CreateRoleUserDto) {
    return this.prismaService.roleUser.create({data:{name:createRoleUserDto.name}});
  }

  findAll() {
   return this.prismaService.roleUser.findMany({
    include:{users:true}
   
    })}
  
 

  findOne(id: number) {
    return this.prismaService.roleUser.findUnique({where:{id},include:{users:true}});
  }

  update(id: number, updateRoleUserDto: UpdateRoleUserDto) {
    return this.prismaService.roleUser.update({where:{id},data:updateRoleUserDto});
  }

  remove(id: number) {
    return this.prismaService.roleUser.delete({where:{id}});
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createGroupDto: CreateGroupDto) {
    const staff = await this.prismaService.staff.findUnique({
      where: { id: createGroupDto.staffId },
    });
    if (!staff) {
      throw new BadRequestException({
        message: "Staff is not defined",
      });
    }
    // Guruh nomi mavjudligini tekshiramiz
    const existingGroup = await this.prismaService.group.findUnique({
      where: { group_name: createGroupDto.group_name },
    });

    if (existingGroup) {
      throw new BadRequestException("Bunday nomli guruh allaqachon mavjud");
    }

    const group = await this.prismaService.group.create({
      data: {
        group_name: createGroupDto.group_name,
        age_range: createGroupDto.age_range,
        max_capacity: createGroupDto.max_capacity,
        building_number: createGroupDto.building_number,
        room_number: createGroupDto.room_number,
        room_floor: createGroupDto.room_floor,
        is_active: createGroupDto.is_active,
        GroupStaff: {
          create: [
            {
              staffId: staff.id,
            },
          ],
        },
      },
    });
    return group;
  }

  findAll() {
    return this.prismaService.group.findMany({
      include: {
        GroupStaff: { include: { staff: true } },
        schedule: true,
        attendance_group: true,
        events: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.group.findUnique({
      where: { id },
      include: {
        GroupStaff: { include: { staff: true } },
        schedule: true,
        attendance_group: true,
        events: true,
      },
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return await this.prismaService.group.update({
      where: { id },
      data: updateGroupDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.events.deleteMany({
      where: { groupId: id }, 
    });

 

    await this.prismaService.attendance_group.deleteMany({
      where: { groupId: id },
    });

    await this.prismaService.schedules.deleteMany({
      where: { groupId: id }, 
    });

    
    return await this.prismaService.group.delete({
      where: { id: id }, 
    });
  }
}

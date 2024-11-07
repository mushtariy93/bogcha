import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAttendanceGroupDto, UpdateAttendanceGroupDto } from "./dto";

@Injectable()
export class AttendanceGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAttendanceGroupDto:CreateAttendanceGroupDto) {
    const child = await this.prismaService.child.findUnique({
      where: { id: createAttendanceGroupDto.childId },
    });
    if (!child) {
      throw new BadRequestException("Child not found");
    }

    const group = await this.prismaService.group.findUnique({
      where: { id: createAttendanceGroupDto.groupId },
    });
    if (!group) {
      throw new BadRequestException("Group not found");
    }

    return await this.prismaService.attendance_group.create({
      data: {
        childId: createAttendanceGroupDto.childId,
        groupId: createAttendanceGroupDto.groupId,
        date: createAttendanceGroupDto.date,
        check_in_time: createAttendanceGroupDto.check_in_time,
        check_up_time: createAttendanceGroupDto.check_up_time,
      },
    });
  }

  async findAll() {
    return await this.prismaService.attendance_group.findMany({
      include: {
        child: true, 
        group: true, 
      },
    });
  }

  async findOne(id: number) {
    const attendance = await this.prismaService.attendance_group.findUnique({
      where: { id },
      include: {
        child: true,
        group: true,
      },
    });
    if (!attendance) {
      throw new BadRequestException("Attendance record not found");
    }
    return attendance;
  }

  async update(id: number, createAttendanceGroupDto:UpdateAttendanceGroupDto) {
    const attendance = await this.prismaService.attendance_group.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new BadRequestException("Attendance record not found");
    }

    return await this.prismaService.attendance_group.update({
      where: { id },
      data: {
        childId: createAttendanceGroupDto.childId,
        groupId: createAttendanceGroupDto.groupId,
        date: createAttendanceGroupDto.date,
        check_in_time: createAttendanceGroupDto.check_in_time,
        check_up_time: createAttendanceGroupDto.check_up_time,
      },
    });
  }

  async remove(id: number) {
    const attendance = await this.prismaService.attendance_group.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new BadRequestException("Attendance record not found");
    }

    return await this.prismaService.attendance_group.delete({
      where: { id },
    });
  }
}

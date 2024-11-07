import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.events.create({ data: createEventDto });
  }

  findAll() {
    return this.prismaService.events.findMany({
      include: {
        group: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.events.findUnique({
      where: { id },
      include: { group: true },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.prismaService.events.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: number) {
    return this.prismaService.events.delete({ where: { id } });
  }
}

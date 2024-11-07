import { Injectable } from '@nestjs/common';
import { CreateSchwduleDto } from './dto/create-schwdule.dto';
import { UpdateSchwduleDto } from './dto/update-schwdule.dto';

@Injectable()
export class SchwdulesService {
  create(createSchwduleDto: CreateSchwduleDto) {
    return 'This action adds a new schwdule';
  }

  findAll() {
    return `This action returns all schwdules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schwdule`;
  }

  update(id: number, updateSchwduleDto: UpdateSchwduleDto) {
    return `This action updates a #${id} schwdule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schwdule`;
  }
}

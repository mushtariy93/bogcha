import { PartialType } from '@nestjs/swagger';
import { CreateSchwduleDto } from './create-schwdule.dto';

export class UpdateSchwduleDto extends PartialType(CreateSchwduleDto) {}

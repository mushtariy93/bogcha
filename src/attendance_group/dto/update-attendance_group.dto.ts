import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceGroupDto } from './create-attendance_group.dto';

export class UpdateAttendanceGroupDto extends PartialType(CreateAttendanceGroupDto) {}

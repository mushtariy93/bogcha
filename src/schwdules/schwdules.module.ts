import { Module } from '@nestjs/common';
import { SchwdulesService } from './schwdules.service';
import { SchwdulesController } from './schwdules.controller';

@Module({
  controllers: [SchwdulesController],
  providers: [SchwdulesService],
})
export class SchwdulesModule {}

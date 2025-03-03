import { Module } from '@nestjs/common';
import { MediumService } from './medium.service';
import { MediumController } from './medium.controller';

@Module({
  controllers: [MediumController],
  providers: [MediumService],
})
export class MediumModule {}

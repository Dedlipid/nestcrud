import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';

@Module({
  controllers: [FightsController],
  providers: [FightsService],
})
export class FightsModule {}

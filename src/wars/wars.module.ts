import { Module } from '@nestjs/common';
import { WarsService } from './wars.service';
import { WarsController } from './wars.controller';
import { FightsModule } from './fights/fights.module';

@Module({
  controllers: [WarsController],
  providers: [WarsService],
  imports: [FightsModule],
})
export class WarsModule {}

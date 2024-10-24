import { Module } from '@nestjs/common';
import { WarSimulatorService } from './war-simulator.service';

@Module({
  providers: [WarSimulatorService],
  exports: [WarSimulatorService],
})
export class WarSimulatorModule {}

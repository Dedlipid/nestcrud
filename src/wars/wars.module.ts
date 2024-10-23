import { Module } from '@nestjs/common';
import { WarsService } from './wars.service';
import { WarsController } from './wars.controller';
import { FightsModule } from './fights/fights.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Participant} from "./entities/participant.entity";
import {War} from "./entities/war.entity";

@Module({
  controllers: [WarsController],
  providers: [WarsService],
  imports: [FightsModule, TypeOrmModule.forFeature([War, Participant])],
})
export class WarsModule {}

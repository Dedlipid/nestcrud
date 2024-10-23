import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Attack} from "./entities/attack.entity";
import {Fight} from "./entities/fight.entity";

@Module({
  controllers: [FightsController],
  providers: [FightsService],
  imports: [TypeOrmModule.forFeature([Fight, Attack])],
})
export class FightsModule {}

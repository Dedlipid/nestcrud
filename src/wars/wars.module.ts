import { Module } from '@nestjs/common';
import { WarsService } from './wars.service';
import { WarsController } from './wars.controller';
import { FightsModule } from './fights/fights.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { War } from './entities/war.entity';
import { ParticipantController } from './participant/participant.controller';
import { ParticipantService } from './participant/participant.service';
import { HeroesModule } from 'src/heroes/heroes.module';
import { League } from 'src/leagues/entities/league.entity';

@Module({
  controllers: [WarsController, ParticipantController],
  providers: [WarsService, ParticipantService],
  imports: [
    FightsModule,
    TypeOrmModule.forFeature([War, Participant, League]),
    HeroesModule,
  ],
})
export class WarsModule {}

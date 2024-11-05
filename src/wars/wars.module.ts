import { Module, ValidationPipe } from '@nestjs/common';
import { WarsService } from './wars.service';
import { WarsController } from './wars.controller';
import { FightsModule } from './fights/fights.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { War } from './entities/war.entity';
import { ParticipantController } from './participant/participant.controller';
import { ParticipantService } from './participant/participant.service';

import { Hero } from 'src/heroes/entities/hero.entity';
import { HeroesModule } from 'src/heroes/heroes.module';
import { HeroesModule } from 'src/heroes/heroes.module';
import { League } from 'src/leagues/entities/league.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [WarsController, ParticipantController],
  providers: [
    WarsService,
    ParticipantService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    FightsModule,
    TypeOrmModule.forFeature([War, Participant, League]),
    HeroesModule,
  ],
})
export class WarsModule {}

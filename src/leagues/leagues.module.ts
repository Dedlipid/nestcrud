import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeaguesHeroesController } from './heroes/heroes.controller';
import { LeaguesHeroesService } from './heroes/heroes.service';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [TypeOrmModule.forFeature([League]), HeroesModule],
  controllers: [LeaguesController, LeaguesHeroesController],
  providers: [LeaguesService, LeaguesHeroesService],
})
export class LeaguesModule {}

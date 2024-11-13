import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeaguesHeroesService } from './heroes/heroes.service';
import { HeroesModule } from '../heroes/heroes.module';
import { LeaguesHeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([League]),
    HeroesModule,
    LeaguesHeroesModule,
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService, LeaguesHeroesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}

import { Module } from '@nestjs/common';
import { LeaguesHeroesController } from './heroes.controller';
import { LeaguesHeroesService } from './heroes.service';

@Module({
  controllers: [LeaguesHeroesController],
  providers: [LeaguesHeroesService],
  exports: [LeaguesHeroesController, LeaguesHeroesService],
})
export class LeaguesHeroesModule {}

import { forwardRef, Module } from '@nestjs/common';
import { LeaguesHeroesController } from './heroes.controller';
import { LeaguesHeroesService } from './heroes.service';
import { LeaguesModule } from '../leagues.module';
import { HeroesModule } from '../../heroes/heroes.module';

@Module({
  controllers: [LeaguesHeroesController],
  providers: [LeaguesHeroesService],
  exports: [LeaguesHeroesService],
  imports: [forwardRef(() => LeaguesModule), HeroesModule],
})
export class LeaguesHeroesModule {}

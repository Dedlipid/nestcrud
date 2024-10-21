import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LeaguesHeroesService } from './heroes.service';

@Controller('leagues/:leagueId/heroes')
export class LeaguesHeroesController {
  constructor(protected readonly leaguesHeroesService: LeaguesHeroesService) {}

  @Post(':heroId')
  insert(@Param('leagueId') leagueId: string, @Param('heroId') heroId: string) {
    return this.leaguesHeroesService.insert(leagueId, heroId);
  }

  @Delete(':heroId')
  kick(@Param('leagueId') leagueId: string, @Param('heroId') heroId: string) {
    return this.leaguesHeroesService.kick(leagueId, heroId);
  }
}

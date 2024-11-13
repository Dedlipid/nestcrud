import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { LeaguesHeroesService } from './heroes.service';
import { UUID } from 'crypto';
import { LeaguesService } from '../leagues.service';
import { HeroesService } from '../../heroes/heroes.service';
import { PaginationDto } from '../../helpers/pagination/pagination-dto';

@Controller('leagues/:leagueId/heroes')
export class LeaguesHeroesController {
  constructor(
    protected readonly leaguesHeroesService: LeaguesHeroesService,
    protected readonly leagueService: LeaguesService,
    protected readonly heroService: HeroesService,
  ) {}

  @Get()
  async findHero(
    @Param('leagueId', ParseUUIDPipe) leagueId: UUID,
    @Query() paginationOption: PaginationDto,
  ) {
    const league = await this.leagueService.findOne(leagueId);
    if (!league) throw new NotFoundException();
    return this.heroService.findAll(paginationOption, {
      league,
    });
  }

  @Post(':heroId')
  async insert(
    @Param('leagueId', ParseUUIDPipe) leagueId: UUID,
    @Param('heroId', ParseUUIDPipe) heroId: UUID,
  ) {
    await this.leaguesHeroesService.insert(leagueId, heroId);
    return this.leagueService.findOne(leagueId);
  }

  @Delete(':heroId')
  async kick(
    @Param('leagueId', ParseUUIDPipe) leagueId: UUID,
    @Param('heroId', ParseUUIDPipe) heroId: UUID,
  ) {
    await this.leaguesHeroesService.kick(leagueId, heroId);
    return this.leagueService.findOne(leagueId);
  }
}

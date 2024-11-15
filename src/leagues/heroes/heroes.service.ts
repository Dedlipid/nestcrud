import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { League } from '../entities/league.entity';
import { DataSource } from 'typeorm';
import { HeroesService } from '../../heroes/heroes.service';
import { Hero } from '../../heroes/entities/hero.entity';
import { UUID } from 'crypto';
import { LeaguesService } from '../leagues.service';
import { he } from '@faker-js/faker';

@Injectable()
export class LeaguesHeroesService {
  constructor(
    private dataSource: DataSource,
    private leaguesService: LeaguesService,
    private heroService: HeroesService,
  ) {}

  async createAnonymousLeague(hero: Hero) {
    const anonymousLeague = new League();
    anonymousLeague.createdAt = new Date();

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(anonymousLeague);
      hero.league = anonymousLeague;
      await queryRunner.manager.save(hero);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async insert(leagueId: UUID, heroId: UUID) {
    const hero = await this.heroService.findOne(heroId as UUID);
    const league = await this.leaguesService.findOne(leagueId);
    if (hero && league) {
      if (hero.league.id === league.id) return;
      const heroOldLeague = hero.league;
      if (heroOldLeague && !heroOldLeague.isAnonymous) {
        throw new ConflictException();
      }
      hero.league = league;

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.save(hero);
        if (heroOldLeague && heroOldLeague.isAnonymous) {
          await queryRunner.manager.delete(League, heroOldLeague.id);
        }

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }
  }

  async kick(leagueId: UUID, heroId: UUID) {
    const hero = await this.heroService.findOne(heroId as UUID);
    const league = await this.leaguesService.findOne(leagueId);
    if (hero && league) {
      const heroCurrentLeague = hero.league;
      if (heroCurrentLeague.isAnonymous) {
        throw new ForbiddenException();
      }
      if (league.id !== heroCurrentLeague.id) {
        throw new ForbiddenException();
      }
      return this.createAnonymousLeague(hero);
    } else throw new NotFoundException();
  }
}

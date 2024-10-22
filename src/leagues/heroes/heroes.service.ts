import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from '../entities/league.entity';
import { Repository } from 'typeorm';
import { HeroesService } from '../../heroes/heroes.service';
import { Hero } from '../../heroes/entities/hero.entity';

@Injectable()
export class LeaguesHeroesService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
    private heroService: HeroesService,
  ) {}

  async createAnonymousLeague(hero: Hero) {
    const anonymousLeague = new League();

    const queryRunner =
      this.leagueRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(anonymousLeague);
      await queryRunner.manager.save(hero);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async insert(leagueId: string, heroId: string) {
    const hero = await this.heroService.findOne(heroId);
    const league = await this.leagueRepository.findOneBy({ id: leagueId });
    if (hero && league) {
      const heroOldLeague = hero.league;
      if (heroOldLeague && !heroOldLeague.isAnonymous) {
        throw new ConflictException();
      }
      hero.league = league;
      return this.leagueRepository.manager.transaction(
        // todo refactor this with queryRunner
        async (transactionalEntityManager) => {
          const result = await transactionalEntityManager.save(hero);
          if (heroOldLeague) {
            await transactionalEntityManager.delete(League, heroOldLeague.id);
          }
          return result;
        },
      );
    } else throw new NotFoundException();
  }

  async kick(leagueId: string, heroId: string) {
    const hero = await this.heroService.findOne(heroId);
    const league = await this.leagueRepository.findOneBy({ id: leagueId });
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

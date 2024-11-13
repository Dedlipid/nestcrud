import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { createFindOptions } from '../helpers/pagination/database';
import { PaginationOptions } from '../helpers/pagination/interface';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
  ) {}

  create(createHeroDto: CreateHeroDto) {
    const hero = this.heroRepository.create(createHeroDto);
    hero.createdAt = new Date();
    return this.heroRepository.save(hero);
  }

  findAll(
    options: PaginationOptions = {},
    advanceOptions?: FindOptionsWhere<Hero>,
  ) {
    return this.heroRepository.find(createFindOptions(options, advanceOptions));
  }

  findAllAdvance(options: FindManyOptions<Hero>) {
    return this.heroRepository.find(options);
  }

  async findOne(id: UUID) {
    const hero = await this.heroRepository.findOne({
      where: { id },
    });
    if (!hero) throw new NotFoundException(`Hero with ID ${id} not found`);
    return hero;
  }

  async update(id: UUID, updateHeroDto: UpdateHeroDto) {
    const entity = await this.heroRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Hero with ID ${id} not found`);
    const updateHero = this.heroRepository.merge(entity, updateHeroDto);
    return this.heroRepository.save(updateHero);
  }

  async remove(id: UUID) {
    const entity = await this.heroRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Hero with ID ${id} not found`);
    await this.heroRepository.delete(id);
  }
}

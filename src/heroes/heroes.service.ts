import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
  ) {}

  create(createHeroDto: CreateHeroDto) {
    const entity = Hero.from(createHeroDto);
    return this.heroRepository.save(entity);
  }

  findAll({ take = 10, skip = 0 }: { take?: number; skip: number }) {
    return this.heroRepository.findAndCount({ take: take, skip: skip });
  }

  findOne(id: string) {
    return this.heroRepository.findOneBy({ id });
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {
    const entity = await this.heroRepository.findOneBy({ id });
    if (entity) {
      entity.merge(updateHeroDto);
      return this.heroRepository.save(entity);
    } else throw new NotFoundException();
  }

  async remove(id: string) {
    const entity = await this.heroRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException();
    await this.heroRepository.delete(id);
  }
}

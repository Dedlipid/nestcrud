import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
  ) {}

  create(createHeroDto: CreateHeroDto) {
    const hero = this.heroRepository.create(createHeroDto);

    if (createHeroDto.lastDamageAt) {
      hero.lastDamageAt = new Date(createHeroDto.lastDamageAt);
    }
    return this.heroRepository.save(hero);
  }

  findAll({ take, skip }: { take?: number; skip?: number }) {
    return this.heroRepository.findAndCount({ take: take, skip: skip });
  }

  async cfindOne(id: UUID) {
    const hero = await this.heroRepository.findOneBy({ id });
    if (!hero) throw new NotFoundException(`Hero with ID ${id} not found`);
    return hero;
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {
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

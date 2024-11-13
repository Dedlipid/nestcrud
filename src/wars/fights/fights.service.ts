import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import {
  DEFAULT_TAKE_VALUE,
  PaginationOptions,
} from 'src/helpers/pagination/interface';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
  ) {}

  create(createFightDto: CreateFightDto) {
    const fight = this.fightRepository.create(createFightDto);
    return this.fightRepository.save(fight);
  }

  findAll(options: PaginationOptions) {
    const {
      limit = DEFAULT_TAKE_VALUE,
      after,
      before = new Date(),
      dec = false,
    } = options;
    const forceLimit = Math.min(limit, 10);

    const query = this.fightRepository.createQueryBuilder('fight');

    if (after) {
      query.andWhere('fight.startAt > :after', { after: new Date(after) });
    }

    if (before) {
      query.andWhere('fight.startAt < :before', { before: new Date(before) });
    }

    query.orderBy('fight.startAt', dec ? 'DESC' : 'ASC');
    query.take(forceLimit);

    return query.getMany();
  }

  async findOne(id: UUID) {
    const fight = await this.fightRepository.findOneBy({ id });
    if (!fight) throw new NotFoundException(`Fight with ID ${id} not found`);
    return fight;
  }

  async update(id: UUID, updateFightDto: UpdateFightDto) {
    const entity = await this.fightRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Fight with ID ${id} not found`);
    const updateFight = this.fightRepository.merge(entity, updateFightDto);
    return this.fightRepository.save(updateFight);
  }

  async remove(id: UUID) {
    const entity = this.fightRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Fight with ID ${id} not found`);
    await this.fightRepository.delete(id);
  }
}

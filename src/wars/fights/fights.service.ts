import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

    const query = this.fightRepository.createQueryBuilder('fight');

    if (after) {
      query.andWhere('fight.createdAt > :after', { after: new Date(after) });
    }

    if (before) {
      query.andWhere('fight.createdAt < :before', { before: new Date(before) });
    }

    query.orderBy('fight.createdAt', dec ? 'DESC' : 'ASC');
    query.take(limit);

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
    if (entity.endAt)
      throw new MethodNotAllowedException('Cannot update ended fight');

    if (entity.startAt < new Date())
      throw new UnprocessableEntityException('Cannot update ongoing fight');

    const updateFight = this.fightRepository.merge(entity, updateFightDto);
    return this.fightRepository.save(updateFight);
  }

  async remove(id: UUID) {
    const entity = await this.fightRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`Fight with ID ${id} not found`);
    if (entity.endAt)
      throw new MethodNotAllowedException('Cannot remove ended fight');
    if (entity.startAt < new Date())
      throw new UnprocessableEntityException('Cannot remove ongoing fight');
    await this.fightRepository.delete(id);
  }
}

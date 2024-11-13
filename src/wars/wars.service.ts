import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { War } from './entities/war.entity';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';
import {
  DEFAULT_TAKE_VALUE,
  PaginationOptions,
} from 'src/helpers/pagination/interface';

@Injectable()
export class WarsService {
  private readonly logger = new Logger(WarsService.name);

  constructor(
    @InjectRepository(War)
    private warRepository: Repository<War>,
  ) {}

  async create(createWarDto: CreateWarDto) {
    const war = await this.warRepository.create(createWarDto);
    return await this.warRepository.save(war);
  }

  async update(id: UUID, updateWarDto: UpdateWarDto) {
    const entity = await this.warRepository.findOneBy({ id });
    if (entity) {
      const updatedWar = plainToInstance(War, updateWarDto);
      Object.assign(entity, updatedWar);
      return this.warRepository.save(entity);
    } else throw new NotFoundException();
  }

  findAll(options: PaginationOptions): Promise<War[]> {
    //before should default to the current date
    const {
      limit = DEFAULT_TAKE_VALUE,
      after,
      before = new Date(),
      dec = false,
    } = options;
    const forceLimit = Math.min(limit, 10);

    const query = this.warRepository.createQueryBuilder('war');

    if (after) {
      query.andWhere('war.startAt > :after', { after: new Date(after) });
    }

    if (before) {
      query.andWhere('war.startAt < :before', { before: new Date(before) });
    }

    query.orderBy('war.startAt', dec ? 'DESC' : 'ASC');
    query.take(forceLimit);

    return query.getMany();
  }

  findOne(id: UUID) {
    return this.warRepository.findOneBy({ id });
  }

  async remove(id: UUID) {
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`War with ID ${id} not found`);
    await this.warRepository.delete(id);
  }
  // async findAllInWar(warId: UUID, leagueId?: UUID) {
  //   const participants = await this.participantRepository.find({
  //     where: { warId },
  //   });
  //   if (leagueId) return participants.filter((p) => p.league.id === leagueId);
  //   return participants;
  // }
}

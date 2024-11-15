import { BadRequestException, ConflictException, Injectable, Logger, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { War } from './entities/war.entity';
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
  ) { }

  create(createWarDto: CreateWarDto) {
    const war = this.warRepository.create(createWarDto);
    return this.warRepository.save(war);
  }

  async update(id: UUID, updateWarDto: UpdateWarDto) {
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`War with ID ${id} not found`);
    
    if (entity.endAt)
      throw new MethodNotAllowedException('Cannot delete ended war');
    
    if (entity.startAt < new Date())
      throw new BadRequestException('Cannot delete ongoing war');
    
    this.warRepository.merge(entity, updateWarDto);
    return await this.warRepository.save(entity);
  }

  findAll(options: PaginationOptions): Promise<War[]> {
    /* const {
        limit = DEFAULT_TAKE_VALUE,
        after,
        before = new Date(),
        dec = false,
      } = options;

      const query = this.warRepository.createQueryBuilder('war');

      if (after) {
        query.andWhere('war."startAt" > :after', { after: new Date(after) });
      }

      if (before) {
        query.andWhere('war."startAt" < :before', { before: new Date(before) });
      }

      query.orderBy('war."startAt"', dec ? 'DESC' : 'ASC');
      query.take(limit);*/
    const query = this.warRepository.createQueryBuilder('war');

    const limit = options.limit ?? DEFAULT_TAKE_VALUE;
    const before = options.before ?? new Date().toISOString();

    const queryMaps = {
      after: (value: string) =>
        query.andWhere('war."startAt" > :after', { after: new Date(value) }),
      before: (value: string) =>
        query.andWhere('war."startAt" < :before', { before: new Date(value) }),
      dec: (value: boolean) =>
        query.orderBy('war."startAt"', value ? 'DESC' : 'ASC'),
      limit: (value: number) => query.take(value),
    };

    queryMaps.limit(limit);
    queryMaps.before(before);

    for (const [key, value] of Object.entries(options)) {
      if (queryMaps[key]) queryMaps[key](value);
    }

    if (!options.dec) query.orderBy('war."startAt"', 'ASC');

    return query.getMany();
  }

  findOne(id: UUID) {
    const hero = this.warRepository.findOneBy({ id });
    if (!hero) throw new NotFoundException(`War with ID ${id} not found`);
    return hero;
  }

  async remove(id: UUID) {
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException(`War with ID ${id} not found`);
    
    if (entity.endAt)
      throw new MethodNotAllowedException('Cannot delete ended war');

    if (entity.startAt < new Date())
      throw new BadRequestException('Cannot delete ongoing war');//should it just method not allowed?

    await this.warRepository.delete(id);
  }
  /*async findAllInWar(warId: UUID, leagueId?: UUID) {
    const participants = await this.participantRepository.find({
      where: { warId },
    });
    if (leagueId) return participants.filter((p) => p.league.id === leagueId);
    return participants;
  }*/
}

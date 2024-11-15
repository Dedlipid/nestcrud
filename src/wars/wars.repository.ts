import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import {
  DEFAULT_TAKE_VALUE,
  PaginationOptions,
} from 'src/helpers/pagination/interface';
import { DataSource, Repository } from 'typeorm';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { War } from './entities/war.entity';

@Injectable()
export class WarRepository extends Repository<War> {
  constructor(private dataSource: DataSource) {
    super(War, dataSource.createEntityManager());
  }

  async createWar(createWarDto: CreateWarDto): Promise<War> {
    const war = this.create(createWarDto);
    return this.save(war);
  }

  async updateWar(id: UUID, updateWarDto: UpdateWarDto): Promise<War> {
    const war = await this.findOneBy({ id });
    if (!war) return null;
    this.merge(war, updateWarDto);
    return this.save(war);
  }

  async findAllWars(options: PaginationOptions): Promise<War[]> {
    const query = this.createQueryBuilder('war');
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

  async findWarById(id: UUID): Promise<War> {
    return this.findOneBy({ id });
  }

  async removeWar(id: string): Promise<void> {
    await this.delete(id);
  }
}

import {
  BadRequestException,
  Injectable,
  Logger,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import {
  DEFAULT_TAKE_VALUE,
  PaginationOptions,
} from 'src/helpers/pagination/interface';
import { Repository } from 'typeorm';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { War } from './entities/war.entity';

@Injectable()
export class WarsService {
  private readonly logger = new Logger(WarsService.name);

  constructor(
    @InjectRepository(War)
    private warRepository: Repository<War>,
  ) {}

  async create(createWarDto: CreateWarDto) {
    this.logger.log('Creating a new war');
    const war = this.warRepository.create(createWarDto);
    const savedWar = await this.warRepository.save(war);
    this.logger.log(`War created with ID: ${savedWar.id}`);
    return savedWar;
  }

  async update(id: UUID, updateWarDto: UpdateWarDto) {
    this.logger.log(`Updating war with ID: ${id}`);
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) {
      this.logger.warn(`War with ID ${id} not found`);
      throw new NotFoundException(`War with ID ${id} not found`);
    }

    if (entity.endAt) {
      this.logger.warn(`Cannot update ended war with ID: ${id}`);
      throw new MethodNotAllowedException('Cannot update ended war');
    }

    if (entity.startAt < new Date()) {
      this.logger.warn(`Cannot update ongoing war with ID: ${id}`);
      throw new BadRequestException('Cannot update ongoing war');
    }

    this.warRepository.merge(entity, updateWarDto);
    const updatedWar = await this.warRepository.save(entity);
    this.logger.log(`War with ID: ${id} updated successfully`);
    return updatedWar;
  }

  async findAll(options: PaginationOptions): Promise<War[]> {
    this.logger.log('Fetching all wars with pagination options');
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

    const wars = await query.getMany();
    this.logger.log(`Fetched ${wars.length} wars`);
    return wars;
  }

  async findOne(id: UUID) {
    this.logger.log(`Fetching war with ID: ${id}`);
    const hero = await this.warRepository.findOneBy({ id });
    if (!hero) {
      this.logger.warn(`War with ID ${id} not found`);
      throw new NotFoundException(`War with ID ${id} not found`);
    }
    this.logger.log(`War with ID: ${id} fetched successfully`);
    return hero;
  }

  async remove(id: UUID) {
    this.logger.log(`Removing war with ID: ${id}`);
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) {
      this.logger.warn(`War with ID ${id} not found`);
      throw new NotFoundException(`War with ID ${id} not found`);
    }

    if (entity.endAt) {
      this.logger.warn(`Cannot delete ended war with ID: ${id}`);
      throw new MethodNotAllowedException('Cannot delete ended war');
    }

    if (entity.startAt < new Date()) {
      this.logger.warn(`Cannot delete ongoing war with ID: ${id}`);
      throw new BadRequestException('Cannot delete ongoing war');
    }

    await this.warRepository.delete(id);
    this.logger.log(`War with ID: ${id} removed successfully`);
  }
}

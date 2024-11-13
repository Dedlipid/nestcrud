import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { PaginationOptions } from '../helpers/pagination/interface';
import { createFindOptions } from '../helpers/pagination/database';
import { UUID } from 'crypto';

@Injectable()
export class LeaguesService {
  private readonly logger = new Logger(LeaguesService.name);

  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  create(createLeagueDto: CreateLeagueDto) {
    const entity = new League();
    entity.name = createLeagueDto.name;
    entity.createdAt = new Date();
    return this.leagueRepository.save(entity);
  }

  findAll(options: PaginationOptions = {}) {
    return this.leagueRepository.find(createFindOptions(options));
  }

  async findOne(id: UUID) {
    const league = await this.leagueRepository.findOneBy({ id });
    if (!league) throw new NotFoundException(`League with ID ${id} not found`);
    return league;
  }

  async update(id: UUID, updateLeagueDto: UpdateLeagueDto) {
    const entity = await this.leagueRepository.findOneBy({ id });
    if (entity) {
      entity.name = updateLeagueDto.name;
      return this.leagueRepository.save(entity);
    } else throw new NotFoundException();
  }

  async remove(id: UUID) {
    const entity = await this.leagueRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException();
    if (entity.isAnonymous) throw new ForbiddenException();
    await this.leagueRepository.delete(id);
  }
}

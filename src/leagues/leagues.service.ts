import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}
  create(createLeagueDto: CreateLeagueDto) {
    const entity = new League();
    entity.name = createLeagueDto.name;
    return this.leagueRepository.save(entity);
  }

  findAll() {
    return this.leagueRepository.find();
  }

  findOne(id: string) {
    return this.leagueRepository.findOneBy({ id });
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto) {
    const entity = await this.leagueRepository.findOneBy({ id });
    if (entity) {
      entity.name = updateLeagueDto.name;
      return this.leagueRepository.save(entity);
    } else throw new NotFoundException();
  }

  async remove(id: string) {
    const entity = await this.leagueRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException();
    if (entity.isAnonymous) throw new ForbiddenException();
    await this.leagueRepository.delete(id);
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Participant } from '../entities/participant.entity';
import { HeroesService } from 'src/heroes/heroes.service';
import { WarsService } from '../wars.service';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly heroesService: HeroesService,
    private readonly warsService: WarsService,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async create(warId: UUID, heroId: UUID) {
    const hero = await this.heroesService.findOne(heroId);
    if (!hero) throw new NotFoundException('Hero not found');
    if (!hero.league)
      throw new UnprocessableEntityException('Hero must be in a league');
    const war = await this.warsService.findOne(warId);
    if (!war) throw new NotFoundException('War not found');

    const participant = this.participantRepository.create({
      war,
      warId,
      hero,
      heroId,
      league: hero.league,
    });

    return this.participantRepository.save(participant);
  }

  async findOne(id: UUID) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }
    return participant;
  }

  async remove(warId: UUID, heroId: UUID) {
    const war = await this.warsService.findOne(warId);
    if (!war) throw new NotFoundException('War not found');
    if (war.withdraw) throw new UnprocessableEntityException('War is ongoing');
    const participant = await this.participantRepository.findOneBy({
      heroId,
      warId,
    });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    await this.participantRepository.remove(participant);
  }
}

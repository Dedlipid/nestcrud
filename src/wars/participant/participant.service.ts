import { Injectable } from '@nestjs/common';
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
    const participant = new Participant();
    const hero = await this.heroesService.findOne(heroId);
    if (!hero) throw new Error('Hero not found');
    if (!hero.league) throw new Error('Hero must be in a league');
    else {
      participant.heroId = heroId;
      participant.hero = hero;
      participant.league = hero.league;
    }
    const war = await this.warsService.findOne(warId);
    if (!war) throw new Error('War not found');
    participant.war = war;
    participant.warId = warId;
    return await this.participantRepository.save(participant);
  }

  findOne(id: UUID) {
    return this.participantRepository.findOneBy({ id });
  }

  async remove(warId: UUID, heroId: UUID) {
    const participant = await this.participantRepository.findOneBy({
      heroId,
      warId,
    });
    return this.participantRepository.remove(participant);
  }
}

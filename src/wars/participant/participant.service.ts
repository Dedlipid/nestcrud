import {
  ConflictException,
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

//const LEAGUE_LIMIT = 2;

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
    if (war.endAt)
      throw new UnprocessableEntityException(
        'Cannot add participant to ended war',
      );
    if (war.startAt < new Date())
      throw new UnprocessableEntityException(
        'Cannot add participant to ongoing war',
      );
    //TODO: check if legue is even in the war?

    const checkParticipant = await this.participantRepository.findOneBy({
      heroId,
      warId,
    });
    if (checkParticipant)
      throw new ConflictException('Participant already exists');

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
    if (war.startAt < new Date())
      throw new UnprocessableEntityException(
        'Cannot remove participant from ongoing war',
      );

    const hero = await this.heroesService.findOne(heroId);
    if (!hero) throw new NotFoundException('Hero not found');

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

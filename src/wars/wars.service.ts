import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { War } from './entities/war.entity';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class WarsService {
  constructor(
    @InjectRepository(War)
    private warRepository: Repository<War>,
  ) {}

  async create(createWarDto: CreateWarDto) {
    console.log('createWarDto', createWarDto);
    const war = plainToInstance(War, createWarDto);
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

  findAll({ take = 10, skip = 0 }: { take?: number; skip: number }) {
    const limit = take > 100 ? 100 : (take ?? 10);
    const offset = skip > 1000 ? 1000 : (skip ?? 0);

    return this.warRepository.findAndCount({ take: limit, skip: offset });
  }

  findOne(id: UUID) {
    return this.warRepository.findOneBy({ id });
  }

  async remove(id: UUID) {
    this.warRepository.delete(id);
  }
  // async findAllInWar(warId: UUID, leagueId?: UUID) {
  //   const participants = await this.participantRepository.find({
  //     where: { warId },
  //   });
  //   if (leagueId) return participants.filter((p) => p.league.id === leagueId);
  //   return participants;
  // }
}

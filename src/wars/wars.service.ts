import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { War } from './entities/war.entity';

// todo implement this service
@Injectable()
export class WarsService {
  constructor(
    @InjectRepository(War)
    private warRepository: Repository<War>,
  ) {}
  create(createWarDto: CreateWarDto) {
    const entity = War.from(createWarDto);
    return this.warRepository.save(entity);
  }

  findAll({ take = 10, skip = 0 }: { take?: number; skip: number }) {
    return this.warRepository.findAndCount({ take: take, skip: skip });
  }

  findOne(id: string) {
    return this.warRepository.findOneBy({ id });
  }

  async update(id: string, updateWarDto: UpdateWarDto) {
    const entity = await this.warRepository.findOneBy({ id });
    if (entity) {
      entity.merge(updateWarDto);
      return this.warRepository.save(entity);
    } else throw new NotFoundException();
  }

  async remove(id: string) {
    const entity = await this.warRepository.findOneBy({ id });
    if (!entity) throw new NotFoundException();
    await this.warRepository.delete(id);
  }
}

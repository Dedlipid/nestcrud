import {
  BadRequestException,
  Injectable,
  Logger,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { PaginationOptions } from 'src/helpers/pagination/interface';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { WarRepository } from './wars.repository';

@Injectable()
export class WarsService {
  private readonly logger = new Logger(WarsService.name);

  constructor(private readonly warRepository: WarRepository) {}

  async create(createWarDto: CreateWarDto) {
    this.logger.log('Creating a new war');
    const savedWar = await this.warRepository.createWar(createWarDto);
    this.logger.log(`War created with ID: ${savedWar.id}`);
    return savedWar;
  }

  async update(id: UUID, updateWarDto: UpdateWarDto) {
    this.logger.log(`Updating war with ID: ${id}`);
    const entity = await this.warRepository.findWarById(id);
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

    const updatedWar = await this.warRepository.updateWar(id, updateWarDto);
    this.logger.log(`War with ID: ${id} updated successfully`);
    return updatedWar;
  }

  async findAll(options: PaginationOptions) {
    this.logger.log('Fetching all wars with pagination options');
    const wars = await this.warRepository.findAllWars(options);
    this.logger.log(`Fetched ${wars.length} wars`);
    return wars;
  }

  async findOne(id: UUID) {
    this.logger.log(`Fetching war with ID: ${id}`);
    const hero = await this.warRepository.findWarById(id);
    if (!hero) {
      this.logger.warn(`War with ID ${id} not found`);
      throw new NotFoundException(`War with ID ${id} not found`);
    }
    this.logger.log(`War with ID: ${id} fetched successfully`);
    return hero;
  }

  async remove(id: UUID) {
    this.logger.log(`Removing war with ID: ${id}`);
    const entity = await this.warRepository.findWarById(id);
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

    await this.warRepository.removeWar(id);
    this.logger.log(`War with ID: ${id} removed successfully`);
  }
}

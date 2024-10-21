import { Injectable } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';

@Injectable()
export class FightsService {
  create(createFightDto: CreateFightDto) {
    return 'This action adds a new fight';
  }

  findAll() {
    return `This action returns all fights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fight`;
  }

  update(id: number, updateFightDto: UpdateFightDto) {
    return `This action updates a #${id} fight`;
  }

  remove(id: number) {
    return `This action removes a #${id} fight`;
  }
}

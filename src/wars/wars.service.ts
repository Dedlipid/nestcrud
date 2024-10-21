import { Injectable } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';

@Injectable()
export class WarsService {
  create(createWarDto: CreateWarDto) {
    return 'This action adds a new war';
  }

  findAll() {
    return `This action returns all wars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} war`;
  }

  update(id: number, updateWarDto: UpdateWarDto) {
    return `This action updates a #${id} war`;
  }

  remove(id: number) {
    return `This action removes a #${id} war`;
  }
}

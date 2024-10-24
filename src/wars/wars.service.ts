import { Injectable } from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {War} from "./entities/war.entity";

// todo implement this service
@Injectable()
export class WarsService {
  constructor(
      @InjectRepository(War)
      private warRepository: Repository<War>,
  ) {}
  create(createWarDto: CreateWarDto) {
    return 'This action adds a new war';
  }

  findAll() {
    return `This action returns all wars`;
  }

  findOne(id: string) {
    return `This action returns a #${id} war`;
  }

  update(id: string, updateWarDto: UpdateWarDto) {
    return `This action updates a #${id} war`;
  }

  remove(id: string) {
    return `This action removes a #${id} war`;
  }
}

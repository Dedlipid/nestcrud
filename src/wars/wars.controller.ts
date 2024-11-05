import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { WarsService } from './wars.service';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { UUID } from 'crypto';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll(@Query('limit') take?: number, @Query('skip') skip?: number) {
    return this.warsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: UUID) {
    return this.warsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(id, updateWarDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: UUID) {
    return this.warsService.remove(id);
  }
}

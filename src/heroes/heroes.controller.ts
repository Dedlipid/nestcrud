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
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { assert } from 'console';
import { sk } from '@faker-js/faker/.';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll(@Query('limit') take?: number, @Query('skip') skip?: number) {
    return this.heroesService.findAll({ skip: skip, take: take });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(id, updateHeroDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}

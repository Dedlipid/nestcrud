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
  Logger,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { UUID } from 'crypto';
import {PaginationDto} from "../helpers/pagination/pagination-dto";
@Controller('heroes')
export class HeroesController {
  private readonly logger = new Logger(HeroesController.name);

  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createHeroDto: CreateHeroDto) {
    try {
      return this.heroesService.create(createHeroDto);
    } catch (error) {
      this.logger.error('Error creating hero', error.stack);
      throw error;
    }
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    try {
      return this.heroesService.findAll(query);
    } catch (error) {
      this.logger.error('Error finding heroes', error.stack);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return this.heroesService.findOne(id);
    } catch (error) {
      this.logger.error(`Error finding hero with id ${id}`, error.stack);
      throw error;
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateHeroDto: UpdateHeroDto,
  ) {
    try {
      return this.heroesService.update(id, updateHeroDto);
    } catch (error) {
      this.logger.error(`Error updating hero with id ${id}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return this.heroesService.remove(id);
    } catch (error) {
      this.logger.error(`Error removing hero with id ${id}`, error.stack);
      throw error;
    }
  }
}

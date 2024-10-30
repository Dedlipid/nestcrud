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
    const limit = take > 100 ? 100 : (take ?? 10);
    const offset = skip > 1000 ? 1000 : (skip ?? 0);

    return this.warsService.findAll({
      skip: offset,
      take: limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(id, updateWarDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.warsService.remove(id);
  }
}

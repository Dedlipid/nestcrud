import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarsService } from './wars.service';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll() { // todo add pagination
    return this.warsService.findAll();
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
  remove(@Param('id') id: string) {
    return this.warsService.remove(id);
  }
}

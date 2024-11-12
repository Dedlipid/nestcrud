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
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WarsService } from './wars.service';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { UUID } from 'crypto';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(201)
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll(@Query('limit') take?: string, @Query('skip') skip?: string) {
    return this.warsService.findAll({
      skip: parseInt(skip) || 0,
      take: Math.min(parseInt(take) || 10, 100),
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.warsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateWarDto: UpdateWarDto,
  ) {
    return this.warsService.update(id, updateWarDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.warsService.remove(id);
  }
}

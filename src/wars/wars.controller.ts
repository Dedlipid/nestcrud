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
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { WarsService } from './wars.service';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/helpers/pagination/pagination-dto';
import { th } from '@faker-js/faker/.';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll(@Query() options: PaginationDto) {
    if (options.limit && options.limit < 0)
      throw new Error('Limit must be greater than 0');

    if (options.before && new Date(options.before) > new Date())
      throw new Error('Date must be before today');

    if (options.after && new Date(options.after) > new Date())
      throw new Error('Date must be before today');

    return this.warsService.findAll(options);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.warsService.remove(id);
  }
}

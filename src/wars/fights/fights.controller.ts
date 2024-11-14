import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FightsService } from './fights.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { UUID } from 'crypto';
import { PaginationDto } from 'src/helpers/pagination/pagination-dto';

@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightsService.create(createFightDto);
  }

  @Get()
  findAll(@Query() options: PaginationDto) {
    if (options.limit && options.limit < 0)
      throw new Error('Limit must be greater than 0');
    if (options.before && new Date(options.before) > new Date())
      throw new Error('Date must be before today');
    if (options.after && new Date(options.after) > new Date())
      throw new Error('Date must be before today');
    return this.fightsService.findAll(options);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.fightsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateFightDto: UpdateFightDto,
  ) {
    return this.fightsService.update(id, updateFightDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.fightsService.remove(id);
  }
}

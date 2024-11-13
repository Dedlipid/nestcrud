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
} from '@nestjs/common';
import { FightsService } from './fights.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { UUID } from 'crypto';
import { PaginationOptions } from 'src/helpers/pagination/interface';
import { PaginationDto } from 'src/helpers/pagination/pagination-dto';

@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

  @Post()
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightsService.create(createFightDto);
  }

  @Get()
  findAll(@Query() options: PaginationDto) {
    return this.fightsService.findAll(options);
  }

  @Get(':id')
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
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.fightsService.remove(id);
  }
}

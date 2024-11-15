import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { ParticipantService } from './participant.service';
import { PaginationDto } from 'src/helpers/pagination/pagination-dto';

@Controller('wars/:warId/participant')
export class ParticipantController {
  constructor(protected readonly participantService: ParticipantService) {}

  @Post('/:heroId')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('warId', ParseUUIDPipe) warId: UUID,
    @Param('heroId') heroId: UUID,
  ) {
    return this.participantService.create(warId, heroId);
  }

  @Delete('/:heroId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('warID', ParseUUIDPipe) warId: UUID,
    @Param('heroId') heroId: UUID,
  ) {
    return this.participantService.remove(warId, heroId);
  }

  @Get()
  findAll(
    @Param('warId', ParseUUIDPipe) warId: UUID,
    @Query() options: PaginationDto,
  ) {
    return this.participantService.findAll(warId);
  }

  @Get('/:heroId')
  findOne(
    @Param('warId', ParseUUIDPipe) warId: UUID,
    @Param('heroId', ParseUUIDPipe) heroId: UUID,
  ) {
    return this.participantService.findOne(warId, heroId);
  }

  //TODO: add GET /wars/:warId/participant/:heroId
  //TODO: add GET /wars/:warId/participant
}

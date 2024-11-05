import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { UUID } from 'crypto';

@Controller('wars/:warId/participant')
export class ParticipantController {
  constructor(protected readonly participantService: ParticipantService) {}

  @Post('/:heroId')
  create(@Param('warId') warId: UUID, @Param('heroId') heroId: UUID) {
    return this.participantService.create(warId, heroId);
  }

  @Delete('/:heroId')
  remove(@Param('warID') warId: UUID, @Param('heroId') heroId: UUID) {
    return this.participantService.remove(warId, heroId);
  }
}

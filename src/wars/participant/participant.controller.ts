import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { UUID } from 'crypto';

@Controller('wars/:warId/participant')
export class ParticipantController {
  constructor(protected readonly participantService: ParticipantService) {}

  @Post('/:heroId')
  create(
    @Param('warId', ParseUUIDPipe) warId: UUID,
    @Param('heroId') heroId: UUID,
  ) {
    return this.participantService.create(warId, heroId);
  }

  @Delete('/:heroId')
  remove(
    @Param('warID', ParseUUIDPipe) warId: UUID,
    @Param('heroId') heroId: UUID,
  ) {
    return this.participantService.remove(warId, heroId);
  }
}

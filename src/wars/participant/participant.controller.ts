import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { ParticipantService } from './participant.service';

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
  //TODO: add GET /wars/:warId/participant/:heroId
  //TODO: add GET /wars/:warId/participant
}

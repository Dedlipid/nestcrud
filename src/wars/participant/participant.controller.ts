import {Controller, Delete, Param, Post} from '@nestjs/common';
import {ParticipantService} from "./participant.service";

// todo implement this
@Controller('participant')
export class ParticipantController {
    constructor(protected readonly participantService: ParticipantService) {
    }

    @Post('/:heroId')
    add(@Param('heroId') heroId: string) {
    }

    @Delete('/:heroId')
    remove(@Param('heroId') heroId: string) {
    }
}

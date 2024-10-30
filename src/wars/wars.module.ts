import { Module, ValidationPipe } from '@nestjs/common';
import { WarsService } from './wars.service';
import { WarsController } from './wars.controller';
import { FightsModule } from './fights/fights.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { War } from './entities/war.entity';
import { ParticipantController } from './participant/participant.controller';
import { ParticipantService } from './participant/participant.service';
import { HeroesModule } from 'src/heroes/heroes.module';

@Module({
  controllers: [WarsController, ParticipantController],
  providers: [WarsService, ParticipantService],
  imports: [
    FightsModule,
    TypeOrmModule.forFeature([War, Participant]),
    HeroesModule,
  ],
})
export class WarsModule {}

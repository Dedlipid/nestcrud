import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { War } from './war.entity';
import { League } from '../../leagues/entities/league.entity';
import { Hero } from '../../heroes/entities/hero.entity';
import { UUID } from 'crypto';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @PrimaryColumn('uuid')
  warId: UUID;

  @PrimaryColumn('uuid')
  heroId: UUID;

  @ManyToOne(() => War, (war) => war.participants, {
    cascade: false,
  })
  @JoinColumn({ name: 'warId' })
  war: War;

  @ManyToOne(() => Hero, {
    cascade: false,
  })
  @JoinColumn({ name: 'heroId' })
  hero: Hero;

  @ManyToOne(() => League, {
    cascade: false,
  })
  league: League;
}

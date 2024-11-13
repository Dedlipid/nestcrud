import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fight } from './fight.entity';
import { Participant } from '../../entities/participant.entity';
import { UUID } from 'crypto';

@Entity()
export class Attack {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  impactAt: Date;

  @Column()
  damage: number;

  @ManyToOne(() => Fight, (fight) => fight.attacks, {
    cascade: false,
    nullable: true,
  })
  fight: Fight;

  @ManyToOne(() => Participant, {
    cascade: false,
  })
  instigator: Participant;

  @ManyToOne(() => Participant, {
    cascade: false,
  })
  recipient: Participant;
}

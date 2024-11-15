import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participant } from '../../entities/participant.entity';
import { Attack } from './attack.entity';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  startAt: Date;

  @Column()
  endAt?: Date;

  @ManyToMany(() => Participant)
  @JoinTable()
  participants: Participant[];

  @OneToMany(() => Attack, (attack) => attack.fight, 
  { cascade: true, 
    lazy: true,
  })
  attacks: Promise<Attack[]>;

  @ManyToMany(() => Participant, { lazy: true })
  @JoinTable()
  winner?: Promise<Participant[]>;

  @ManyToMany(() => Participant, { lazy: true })
  @JoinTable()
  burnt?: Promise<Participant[]>;

  @Expose()
  get withdraw() {
    return !!this.endAt && !this.burnt && !this.winner;
  }
}

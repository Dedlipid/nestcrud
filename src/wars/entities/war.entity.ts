import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participant } from './participant.entity';
import { League } from '../../leagues/entities/league.entity';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';

@Entity()
export class War {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  /*{ //if implicit conversion is a problem put this in the column decorator
    type: 'timestamp',
    transformer: {
      to: (value: string | Date): Date => {
        // Convert a date string to a Date object if it's not already a Date
        return typeof value === 'string' ? new Date(value) : value;
      },
      from: (value: Date): Date => {
        // Return the Date object as is when retrieving from the database
        return value;
      },
    },
  }*/
  @Column()
  startAt: Date;

  @Column({ nullable: true })
  endAt?: Date;

  @OneToMany(() => Participant, (participant) => participant.war, {
    cascade: true,
  })
  participants: Participant[];

  @ManyToOne(() => League, {
    cascade: false,
    nullable: true,
  })
  winner?: League;

  @ManyToOne(() => League, {
    cascade: false,
    nullable: true,
  })
  burnt?: League;

  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  get withdraw() {
    return !!this.endAt && !this.burnt && !this.winner;
  }
}

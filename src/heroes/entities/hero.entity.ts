import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from 'src/leagues/entities/league.entity';
import { UUID } from 'crypto';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  race: string;

  @Column()
  gender: string;

  @Column()
  bio: string;

  @Column({
    unsigned: true,
  })
  maxHealth: number;

  @Column({
    unsigned: true,
  })
  currentHealth: number;

  @Column({
    unsigned: true,
  })
  attack: number;

  @Column({
    unsigned: true,
  })
  defense: number;

  @Column({
    unsigned: true,
  })
  healthRestoreRate: number;

  @Column({
    nullable: true,
  })
  lastDamageAt?: Date;

  @ManyToOne(() => League, (league) => league.heroes, {
    cascade: false,
    nullable: true,
    eager: true,
  })
  league?: League;

  @CreateDateColumn()
  createdAt: Date;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { League } from 'src/leagues/entities/league.entity';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    nullable: true
  })
  lastDamageAt?: Date;

  @ManyToOne(() => League, (league) => league.heroes, {
    cascade: false,
    nullable: true,
  })
  league?: League;

  @Column({
    default: 'CURRENT_TIMESTAMP'
  })
  createdAt: Date
}

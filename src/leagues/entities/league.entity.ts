import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Hero } from '../../heroes/entities/hero.entity';
import { UUID } from 'crypto';

@Entity()
export class League {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    nullable: true,
  })
  name?: string;

  @OneToMany(() => Hero, (hero) => hero.league, { cascade: false })
  heroes: Promise<Hero[]>;

  @Expose()
  get isAnonymous() {
    return !this.name;
  }

  @CreateDateColumn()
  createdAt: Date;
}

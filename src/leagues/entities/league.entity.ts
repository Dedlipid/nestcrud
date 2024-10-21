import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Expose } from 'class-transformer';
import { Hero } from '../../heroes/entities/hero.entity';

@Entity()
export class League {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  name?: string;

  @OneToMany(() => Hero, (hero) => hero.league, { cascade: false })
  heroes: Hero[];
  @Expose()
  get isAnonymous() {
    return !!this.name;
  }
}

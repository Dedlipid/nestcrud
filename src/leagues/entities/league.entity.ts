import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @Expose() // todo check this
  get isAnonymous() {
    return !this.name;
  }

  @Column({
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { plainToInstance } from 'class-transformer';
import { League } from '../../leagues/entities/league.entity';

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

  @Column()
  lastDamageAt!: Date;

  @ManyToOne(() => League, (league) => league.heroes, {
    cascade: false,
    nullable: true,
  })
  league?: League;

  static from(createHeroDto: CreateHeroDto): Hero {
    const hero = plainToInstance(Hero, createHeroDto);
    if (createHeroDto.lastDamageAt) {
      hero.lastDamageAt = new Date(createHeroDto.lastDamageAt);
    }
    return hero;
  }

  merge(updateHeroDto: UpdateHeroDto): void {
    const updatedHero = plainToInstance(Hero, updateHeroDto);
    Object.assign(this, updatedHero);
    if (updateHeroDto.lastDamageAt) {
      this.lastDamageAt = new Date(updateHeroDto.lastDamageAt);
    }
  }
}

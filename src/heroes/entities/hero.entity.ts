import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';
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
    const hero = new Hero();
    hero.name = createHeroDto.name;
    hero.race = createHeroDto.race;
    hero.gender = createHeroDto.gender;
    hero.bio = createHeroDto.bio;
    hero.maxHealth = createHeroDto.maxHealth;
    hero.currentHealth = createHeroDto.currentHealth;
    hero.attack = createHeroDto.attack;
    hero.defense = createHeroDto.defense;
    hero.healthRestoreRate = createHeroDto.healthRestoreRate;
    hero.lastDamageAt = new Date(createHeroDto.lastDamageAt);
    return hero;
  }

  merge(updateHeroDto: UpdateHeroDto): void {
    if (updateHeroDto.name !== undefined) {
      this.name = updateHeroDto.name;
    }
    if (updateHeroDto.race !== undefined) {
      this.race = updateHeroDto.race;
    }
    if (updateHeroDto.gender !== undefined) {
      this.gender = updateHeroDto.gender;
    }
    if (updateHeroDto.bio !== undefined) {
      this.bio = updateHeroDto.bio;
    }
    if (updateHeroDto.maxHealth !== undefined) {
      this.maxHealth = updateHeroDto.maxHealth;
    }
    if (updateHeroDto.currentHealth !== undefined) {
      this.currentHealth = updateHeroDto.currentHealth;
    }
    if (updateHeroDto.attack !== undefined) {
      this.attack = updateHeroDto.attack;
    }
    if (updateHeroDto.defense !== undefined) {
      this.defense = updateHeroDto.defense;
    }
    if (updateHeroDto.healthRestoreRate !== undefined) {
      this.healthRestoreRate = updateHeroDto.healthRestoreRate;
    }
    if (updateHeroDto.lastDamageAt !== undefined) {
      this.lastDamageAt = new Date(updateHeroDto.lastDamageAt);
    }
  }
}

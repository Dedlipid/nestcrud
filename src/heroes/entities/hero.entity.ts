import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {CreateHeroDto} from '../dto/create-hero.dto';
import {UpdateHeroDto} from '../dto/update-hero.dto';
import {Transform} from "class-transformer";

function parseNumber(str) {
    return parseFloat(str.replace(/,/g, ''));
}

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
    health: number;

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
    kiRestoreSpeed: number;

    @Column("text")
    // @Transform(({value}) => typeof value === 'string' ? JSON.parse(value) : value, {toClassOnly: true})
    // @Transform(({value}) => {
    //     console.log('toPlainOnly', value)
    //     return JSON.stringify(value)
    // }, {toPlainOnly: true})
    abilities: string
    @Column()
    img: string;

    static from(createHeroDto: CreateHeroDto): Hero {
        const hero = new Hero();
        hero.name = createHeroDto.name;
        hero.race = createHeroDto.race;
        hero.gender = createHeroDto.gender;
        hero.bio = createHeroDto.bio;
        hero.health = parseNumber(createHeroDto.health); // convert string to number
        hero.attack = parseNumber(createHeroDto.attack); // convert string to number
        hero.defense = parseNumber(createHeroDto.defense); // convert string to number
        hero.kiRestoreSpeed = parseNumber(createHeroDto.kiRestoreSpeed); // convert string to number
        hero.abilities = JSON.stringify(createHeroDto.abilities);
        hero.img = createHeroDto.img;
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
        if (updateHeroDto.health !== undefined) {
            this.health = parseNumber(updateHeroDto.health); // convert string to number
        }
        if (updateHeroDto.attack !== undefined) {
            this.attack = parseNumber(updateHeroDto.attack); // convert string to number
        }
        if (updateHeroDto.defense !== undefined) {
            this.defense = parseNumber(updateHeroDto.defense); // convert string to number
        }
        if (updateHeroDto.kiRestoreSpeed !== undefined) {
            this.kiRestoreSpeed = parseNumber(updateHeroDto.kiRestoreSpeed); // convert string to number
        }
        if (updateHeroDto.abilities !== undefined) {
            this.abilities = JSON.stringify(updateHeroDto.abilities);
        }
        if (updateHeroDto.img !== undefined) {
            this.img = updateHeroDto.img;
        }
    }
}

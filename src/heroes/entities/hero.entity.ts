import {WithId} from "../../json-database/with-id.interface";
import {CreateHeroDto} from "../dto/create-hero.dto";
import {UpdateHeroDto} from "../dto/update-hero.dto";
function parseNumber(str) {
    return parseFloat(str.replace(/,/g, ''));
}
export class Hero implements WithId {
    id: string;
    name: string;
    race: string;
    gender: string;
    bio: string;
    health: number;
    attack: number;
    defense: number;
    kiRestoreSpeed: number;
    abilities: string[];
    img: string;

    static from(dto: CreateHeroDto | UpdateHeroDto, id? :string) {
        const item = new Hero()

        if (id) {
            item.id = id
        }
        if (dto.name !== undefined) item.name = dto.name;
        if (dto.race !== undefined) item.race = dto.race;
        if (dto.gender !== undefined) item.gender = dto.gender;
        if (dto.bio !== undefined) item.bio = dto.bio;
        if (dto.health !== undefined) item.health = parseNumber(dto.health);
        if (dto.attack !== undefined) item.attack = parseNumber(dto.attack);
        if (dto.defense !== undefined) item.defense = parseNumber(dto.defense);
        if (dto.kiRestoreSpeed !== undefined) item.kiRestoreSpeed = parseNumber(dto.kiRestoreSpeed);
        if (dto.abilities !== undefined) item.abilities = dto.abilities;
        if (dto.img !== undefined) item.img = dto.img;

        return item
    }
}

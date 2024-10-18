import {Injectable} from '@nestjs/common';
import {CreateHeroDto} from './dto/create-hero.dto';
import {UpdateHeroDto} from './dto/update-hero.dto';
import {Hero} from "./entities/hero.entity";
import {EntityWriter} from "../json-database/entity-writer/entity-writer";
import {EntityReader} from "../json-database/entity-reader/entity-reader";
import {randomUUID} from 'crypto'

@Injectable()
export class HeroesService {
    protected readonly

    constructor(protected readonly writer: EntityWriter, protected readonly reader: EntityReader) {
    }

    create(createHeroDto: CreateHeroDto) {
        const entity = Hero.from(createHeroDto)
        entity.id = randomUUID()
        return this.writer.create(entity)
    }

    findAll() {
        return `This action returns all heroes`;
    }

    findOne(id: string) {
        return this.reader.get(Hero.from({}, id))
    }

    update(id: string, updateHeroDto: UpdateHeroDto) {
        const entity = Hero.from(updateHeroDto, id)
        return this.writer.update(entity)
    }

    async remove(id: string) {
        await this.writer.remove(Hero.from({}, id))
    }
}

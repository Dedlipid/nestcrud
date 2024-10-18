import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {WithId} from "../with-id.interface";
import {EntityBase} from "../entity-base";

@Injectable()
export class EntityWriter extends EntityBase {
    constructor(configService: ConfigService) {
        super(configService)
    }

    async create<T extends WithId>( entity: T) {
        const name = entity.constructor.name
        await this.checkName(name)
        const {fileName, content} = this.makeFileContent(entity)
        const address = this.getAddress(name, fileName)
        await this.write(address, content)
        return entity
    }

    async update<T extends WithId>(entity: T) {
        const name = entity.constructor.name
        await this.checkName(name)
        const address = this.getAddress(name, this.getFileName(entity))
        const currentEntity = await this.read<T>(address)
        const result = Object.assign(currentEntity, entity) // merge
        const {content} = this.makeFileContent(result)
        await this.write(address, content)
        return result
    }

    async remove<T extends WithId>(entity: T) {
        const name = entity.constructor.name
        await this.checkName(name)
        const address = this.getAddress(name, this.getFileNameById(entity.id))
        await this.delete(address)
    }
}

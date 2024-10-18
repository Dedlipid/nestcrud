import {Injectable} from '@nestjs/common';
import {EntityBase} from "../entity-base";
import {ConfigService} from "@nestjs/config";
import {WithId} from "../with-id.interface";

@Injectable()
export class EntityReader extends EntityBase{

    constructor(configService: ConfigService) {
        super(configService)
    }

    async get<T extends WithId>(entity: T) {
        const name = entity.constructor.name
        await this.checkName(name)
        const address = this.getAddress(name, this.getFileNameById(entity.id))
        return this.read<T>(address)
    }
}

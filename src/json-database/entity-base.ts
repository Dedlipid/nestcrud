import {ConfigService} from "@nestjs/config";
import * as path from "path";
import {existsSync} from "fs";
import * as fs from "fs/promises";
import {WithId} from "./with-id.interface";
import {NotFoundException} from "@nestjs/common";

export class EntityBase { // driver
    protected readonly basePath: string

    constructor(private configService: ConfigService) {
        this.basePath = this.configService.get('DATABASE_PATH')
    }

    protected getAddress(...paths: string[]) {
        return path.join(this.basePath, ...paths)
    }

    protected async checkName(name: string) {
        const address = this.getAddress(name)
        if (existsSync(address)) {
            const state = await fs.stat(address)
            if (!state.isDirectory()) {
                throw new Error('there is a file with the entity name!') // todo make a better error
            }
        } else {
            await fs.mkdir(address, {
                recursive: true
            })
        }
    }

    protected getFileName<T extends WithId>(entity: T) {
        return entity.id + '.json'
    }

    protected getFileNameById(id: string) {
        return id + '.json'
    }

    protected serializeContent<T extends WithId>(entity: T) {
        return JSON.stringify(entity)
    }


    protected deserializeContent<T extends WithId>(content: string): T {
        return JSON.parse(content)
    }

    protected makeFileContent<T extends WithId>(entity: T) {
        return {
            fileName: this.getFileName(entity),
            content: JSON.stringify(entity)
        }
    }

    protected async read<T extends WithId>(fileAddress: string): Promise<T> {
        if (existsSync(fileAddress)) {
            const fileContent = await fs.readFile(fileAddress, 'utf8')
            return this.deserializeContent<T>(fileContent)
        } else throw new NotFoundException()
    }

    protected async write<T extends WithId>(fileAddress: string, content: string) {
        await fs.writeFile(fileAddress, content)
    }

    protected async delete(fileAddress: string) {
        await fs.unlink(fileAddress)
    }
}

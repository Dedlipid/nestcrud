import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import {FindOptionsOrder, LessThan, MoreThan} from "typeorm";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import {DEFAULT_TAKE_VALUE, Pageable, PaginationOptions} from "./interface";



export function createFindOptions<T extends Pageable>(options: PaginationOptions): FindManyOptions<T> {
    const whereOption: FindOptionsWhere<T>[] = [];

    if (options.after) {
        whereOption.push({
            createdAt: MoreThan(new Date(options.after)),
        } as FindOptionsWhere<T>);
    }

    if (options.before) {
        whereOption.push({
            createdAt: LessThan(new Date(options.before)),
        } as FindOptionsWhere<T>);
    }

    return {
        order: {
            createdAt: options.dec ? 'desc' : 'asc',
        } as FindOptionsOrder<T>,
        take: options.limit || DEFAULT_TAKE_VALUE,
        where: whereOption,
    };
}

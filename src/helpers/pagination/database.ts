import {
  FindOptionsWhere,
  FindOptionsWhereProperty,
} from 'typeorm/find-options/FindOptionsWhere';
import { Between, FindOptionsOrder, LessThan, MoreThan } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DEFAULT_TAKE_VALUE, Pageable, PaginationOptions } from './interface';

export function createFindOptions<T extends Pageable>(
  options: PaginationOptions,
  advanceOptions: FindOptionsWhere<T> = {},
): FindManyOptions<T> {
  const whereOption: FindOptionsWhere<T> = {};

  if (options.after && options.before) {
    whereOption.createdAt = Between(
      new Date(options.after),
      new Date(options.before),
    ) as FindOptionsWhereProperty<NonNullable<T['createdAt']>>;
  } else if (options.before) {
    whereOption.createdAt = LessThan(
      new Date(options.before),
    ) as FindOptionsWhereProperty<NonNullable<T['createdAt']>>;
  } else if (options.after) {
    whereOption.createdAt = MoreThan(
      new Date(options.after),
    ) as FindOptionsWhereProperty<NonNullable<T['createdAt']>>;
  }

  return {
    order: {
      createdAt: options.dec ? 'desc' : 'asc',
    } as FindOptionsOrder<T>,
    take: options.limit || DEFAULT_TAKE_VALUE,
    where: { ...advanceOptions, ...whereOption },
  };
}

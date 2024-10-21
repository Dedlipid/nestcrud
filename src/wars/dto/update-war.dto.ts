import { PartialType } from '@nestjs/mapped-types';
import { CreateWarDto } from './create-war.dto';

export class UpdateWarDto extends PartialType(CreateWarDto) {}

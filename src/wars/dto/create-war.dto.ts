import { IsString, IsDateString } from 'class-validator';

export class CreateWarDto {
  @IsString()
  name: string;

  @IsDateString()
  startAt: Date;
}

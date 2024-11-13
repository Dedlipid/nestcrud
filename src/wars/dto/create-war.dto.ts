import { IsString, IsDateString, IsDefined } from 'class-validator';

export class CreateWarDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsDateString()
  startAt: Date;
}

import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateLeagueDto {
  @IsDefined()
  @IsString()
  @MaxLength(74)
  name: string;
}

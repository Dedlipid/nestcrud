import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString, IsDefined, MaxLength,
} from 'class-validator';

export class CreateHeroDto {
  @IsDefined()
  @IsString()
  @MaxLength(74)
  name: string;

  @IsDefined()
  @IsString()
  @MaxLength(74)
  race: string;

  @IsDefined()
  @IsString()
  @MaxLength(74)
  bio: string;

  @IsDefined()
  @IsString()
  @MaxLength(74)
  gender: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  maxHealth: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  currentHealth: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  attack: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  defense: number;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  healthRestoreRate: number;

  @IsOptional()
  @IsDateString()
  lastDamageAt?: string;
}

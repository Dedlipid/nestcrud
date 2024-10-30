import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreateHeroDto {
  @IsString()
  name: string;

  @IsString()
  race: string;

  @IsString()
  bio: string;

  @IsString()
  gender: string;

  @IsNumber()
  @IsPositive()
  maxHealth: number;

  @IsNumber()
  @IsPositive()
  currentHealth: number;

  @IsNumber()
  @IsPositive()
  attack: number;

  @IsNumber()
  @IsPositive()
  defense: number;

  @IsNumber()
  @IsPositive()
  healthRestoreRate: number;

  @IsOptional()
  @IsDateString()
  lastDamageAt?: string;
}

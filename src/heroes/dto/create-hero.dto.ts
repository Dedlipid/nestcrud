export class CreateHeroDto {
  name: string;

  race: string;

  gender: string;

  bio: string;

  maxHealth: number;

  currentHealth: number;

  attack: number;

  defense: number;

  healthRestoreRate: number;

  lastDamageAt!: string;
}

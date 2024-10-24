import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesHeroesService } from './heroes.service';

describe('LeaguesHeroesService', () => {
  let service: LeaguesHeroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaguesHeroesService],
    }).compile();

    service = module.get<LeaguesHeroesService>(LeaguesHeroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

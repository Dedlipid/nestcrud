import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesHeroesController } from './heroes.controller';
import { LeaguesHeroesService } from './heroes.service';

describe('LeaguesHeroesController', () => {
  let controller: LeaguesHeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaguesHeroesController],
      providers: [LeaguesHeroesService],
    }).compile();

    controller = module.get<LeaguesHeroesController>(LeaguesHeroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

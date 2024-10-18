import { Test, TestingModule } from '@nestjs/testing';
import { EntityReader } from './entity-reader';

describe('EntityReader', () => {
  let provider: EntityReader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityReader],
    }).compile();

    provider = module.get<EntityReader>(EntityReader);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

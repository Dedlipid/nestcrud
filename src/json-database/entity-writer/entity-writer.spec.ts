import { Test, TestingModule } from '@nestjs/testing';
import { EntityWriter } from './entity-writer';

describe('EntityWriter', () => {
  let provider: EntityWriter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityWriter],
    }).compile();

    provider = module.get<EntityWriter>(EntityWriter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

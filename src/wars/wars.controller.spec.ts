import { Test, TestingModule } from '@nestjs/testing';
import { WarsController } from './wars.controller';
import { WarsService } from './wars.service';

describe('WarsController', () => {
  let controller: WarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarsController],
      providers: [WarsService],
    }).compile();

    controller = module.get<WarsController>(WarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

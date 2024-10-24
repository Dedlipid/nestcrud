import { Test, TestingModule } from '@nestjs/testing';
import { WarSimulatorService } from './war-simulator.service';

describe('WarSimulatorService', () => {
  let service: WarSimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarSimulatorService],
    }).compile();

    service = module.get<WarSimulatorService>(WarSimulatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

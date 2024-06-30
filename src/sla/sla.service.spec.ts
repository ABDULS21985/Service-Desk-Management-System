import { Test, TestingModule } from '@nestjs/testing';
import { SlaService } from './sla.service';

describe('SlaService', () => {
  let service: SlaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaService],
    }).compile();

    service = module.get<SlaService>(SlaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

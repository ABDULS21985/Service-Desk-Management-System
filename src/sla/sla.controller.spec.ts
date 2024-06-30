import { Test, TestingModule } from '@nestjs/testing';
import { SlaController } from './sla.controller';

describe('SlaController', () => {
  let controller: SlaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlaController],
    }).compile();

    controller = module.get<SlaController>(SlaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

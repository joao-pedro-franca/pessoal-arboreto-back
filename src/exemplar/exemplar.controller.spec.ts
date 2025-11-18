import { Test, TestingModule } from '@nestjs/testing';
import { ExemplarController } from './exemplar.controller';
import { ExemplarService } from './exemplar.service';

describe('ExemplarController', () => {
  let controller: ExemplarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExemplarController],
      providers: [ExemplarService],
    }).compile();

    controller = module.get<ExemplarController>(ExemplarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

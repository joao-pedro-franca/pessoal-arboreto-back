import { Test, TestingModule } from '@nestjs/testing';
import { ExemplarService } from './exemplar.service';

describe('ExemplarService', () => {
  let service: ExemplarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExemplarService],
    }).compile();

    service = module.get<ExemplarService>(ExemplarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

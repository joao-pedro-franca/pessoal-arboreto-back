import { Test, TestingModule } from '@nestjs/testing';
import { BiomaService } from './bioma.service';

describe('BiomaService', () => {
  let service: BiomaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiomaService],
    }).compile();

    service = module.get<BiomaService>(BiomaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

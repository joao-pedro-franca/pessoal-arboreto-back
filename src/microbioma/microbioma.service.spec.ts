import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiomaService } from './microbioma.service';

describe('MicrobiomaService', () => {
  let service: MicrobiomaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicrobiomaService],
    }).compile();

    service = module.get<MicrobiomaService>(MicrobiomaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

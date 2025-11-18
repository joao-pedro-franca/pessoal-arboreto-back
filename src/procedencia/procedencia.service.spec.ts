import { Test, TestingModule } from '@nestjs/testing';
import { ProcedenciaService } from './procedencia.service';

describe('ProcedenciaService', () => {
  let service: ProcedenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcedenciaService],
    }).compile();

    service = module.get<ProcedenciaService>(ProcedenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
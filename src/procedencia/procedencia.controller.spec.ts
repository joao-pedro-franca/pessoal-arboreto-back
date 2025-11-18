import { Test, TestingModule } from '@nestjs/testing';
import { ProcedenciaController } from './procedencia.controller';
import { ProcedenciaService } from './procedencia.service';

describe('ProcedenciaController', () => {
  let controller: ProcedenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedenciaController],
      providers: [ProcedenciaService],
    }).compile();

    controller = module.get<ProcedenciaController>(ProcedenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
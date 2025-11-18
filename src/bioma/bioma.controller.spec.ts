import { Test, TestingModule } from '@nestjs/testing';
import { BiomaController } from './bioma.controller';
import { BiomaService } from './bioma.service';

describe('BiomaController', () => {
  let controller: BiomaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiomaController],
      providers: [BiomaService],
    }).compile();

    controller = module.get<BiomaController>(BiomaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

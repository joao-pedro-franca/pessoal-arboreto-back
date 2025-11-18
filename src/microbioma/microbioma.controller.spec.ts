import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiomaController } from './microbioma.controller';
import { MicrobiomaService } from './microbioma.service';

describe('MicrobiomaController', () => {
  let controller: MicrobiomaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicrobiomaController],
      providers: [MicrobiomaService],
    }).compile();

    controller = module.get<MicrobiomaController>(MicrobiomaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { MicrobiomaService } from './microbioma.service';
import { MicrobiomaController } from './microbioma.controller';

@Module({
  controllers: [MicrobiomaController],
  providers: [MicrobiomaService],
})
export class MicrobiomaModule {}

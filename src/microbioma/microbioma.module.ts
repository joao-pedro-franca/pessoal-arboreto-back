import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicrobiomaService } from './microbioma.service';
import { MicrobiomaController } from './microbioma.controller';
import { Microbioma } from './entities/microbioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Microbioma])],
  controllers: [MicrobiomaController],
  providers: [MicrobiomaService],
  exports: [MicrobiomaService], 
})
export class MicrobiomaModule {}
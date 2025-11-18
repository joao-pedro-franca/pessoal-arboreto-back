import { Module } from '@nestjs/common';
import { ProcedenciaService } from './procedencia.service';
import { ProcedenciaController } from './procedencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedencia } from './entities/procedencia.entity';
import { MicrobiomaModule } from 'src/microbioma/microbioma.module';
import { BiomaModule } from 'src/bioma/bioma.module';
import { EspecieModule } from 'src/especie/especie.module';
import { ArvoreModule } from 'src/arvore/arvore.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Procedencia]),
    MicrobiomaModule, BiomaModule, EspecieModule, ArvoreModule,
  ],
  controllers: [ProcedenciaController],
  providers: [ProcedenciaService],
})
export class ProcedenciaModule {}
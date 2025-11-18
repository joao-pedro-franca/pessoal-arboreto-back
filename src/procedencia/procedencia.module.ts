import { Module } from '@nestjs/common';
import { ProcedenciaService } from './procedencia.service';
import { ProcedenciaController } from './procedencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedencia } from './entities/procedencia.entity';
import { MicrobiomaModule } from 'src/microbioma/microbioma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Procedencia]),
    MicrobiomaModule,
  ],
  controllers: [ProcedenciaController],
  providers: [ProcedenciaService],
})
export class ProcedenciaModule {}

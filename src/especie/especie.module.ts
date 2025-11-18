import { Module } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { EspecieController } from './especie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especie } from './entities/especie.entity';
import { Familia } from 'src/familia/entities/familia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especie, Familia])],
  controllers: [EspecieController],
  providers: [EspecieService],
})
export class EspecieModule { }

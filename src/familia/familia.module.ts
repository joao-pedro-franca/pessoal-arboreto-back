import { Module } from '@nestjs/common';
import { FamiliaService } from './familia.service';
import { FamiliaController } from './familia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familia } from './entities/familia.entity';
import { Especie } from 'src/especie/entities/especie.entity';

@Module({
 imports: [TypeOrmModule.forFeature([Familia, Especie])],
  controllers: [FamiliaController],
  providers: [FamiliaService],
})
export class FamiliaModule {}

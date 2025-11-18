import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DendrometriaService } from './dendrometria.service';
import { DendrometriaController } from './dendrometria.controller';
import { Dendrometria } from './entities/dendrometria.entity';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dendrometria, Arvore])
  ],
  controllers: [DendrometriaController],
  providers: [DendrometriaService],
})
export class DendrometriaModule {}

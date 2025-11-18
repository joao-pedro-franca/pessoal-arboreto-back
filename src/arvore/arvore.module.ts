import { Module } from '@nestjs/common';
import { ArvoreService } from './arvore.service';
import { ArvoreController } from './arvore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arvore } from './entities/arvore.entity';
import { Especie } from 'src/especie/entities/especie.entity';
import { Dendrometria } from 'src/dendrometria/entities/dendrometria.entity';
import { Exsicata } from 'src/exsicata/entities/exsicata.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Arvore, Especie, Dendrometria, Exsicata])
  ],
  controllers: [ArvoreController],
  providers: [ArvoreService],
})
export class ArvoreModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExsicataService } from './exsicata.service';
import { ExsicataController } from './exsicata.controller';
import { Exsicata } from './entities/exsicata.entity';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exsicata, Arvore])
  ],
  controllers: [ExsicataController],
  providers: [ExsicataService],
})
export class ExsicataModule {}

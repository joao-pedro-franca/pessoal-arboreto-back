import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExemplarModule } from './exemplar/exemplar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamiliaModule } from './familia/familia.module';
import { EspecieModule } from './especie/especie.module';
import { ArvoreModule } from './arvore/arvore.module';
import { DendrometriaModule } from './dendrometria/dendrometria.module';
import { ExsicataModule } from './exsicata/exsicata.module';
import { MicrobiomaModule } from './microbioma/microbioma.module';
import { BiomaModule } from './bioma/bioma.module';
import { ProcedenciaModule } from './procedencia/procedencia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Note: não usar synchronize: true em produção (perde dados)
    }),
    ExemplarModule,
    FamiliaModule,
    EspecieModule,
    ArvoreModule,
    DendrometriaModule,
    ExsicataModule,
    MicrobiomaModule,
    BiomaModule,
    ProcedenciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

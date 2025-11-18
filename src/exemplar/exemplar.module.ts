import { Module } from '@nestjs/common';
import { ExemplarService } from './exemplar.service';
import { ExemplarController } from './exemplar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exemplar } from './entities/exemplar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exemplar])
  ],
  controllers: [ExemplarController],
  providers: [ExemplarService],
})
export class ExemplarModule {}

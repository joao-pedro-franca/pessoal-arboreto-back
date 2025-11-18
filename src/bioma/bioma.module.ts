import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiomaService } from './bioma.service';
import { BiomaController } from './bioma.controller';
import { Bioma } from './entities/bioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bioma])],
  controllers: [BiomaController],
  providers: [BiomaService],
})
export class BiomaModule {}

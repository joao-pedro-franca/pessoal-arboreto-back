import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Microbioma } from './entities/microbioma.entity';
import { Procedencia } from '../procedencia/entities/procedencia.entity';
import { CreateMicrobiomaDto } from './dto/create-microbioma.dto';
import { UpdateMicrobiomaDto } from './dto/update-microbioma.dto';
 
@Injectable()
export class MicrobiomaService {
  constructor(
    @InjectRepository(Microbioma)
    private microbiomaRepository: Repository<Microbioma>,
  ) {}

  async create(createMicrobiomaDto: CreateMicrobiomaDto): Promise<Microbioma> {
    const novoMicrobioma = this.microbiomaRepository.create(createMicrobiomaDto);
    return await this.microbiomaRepository.save(novoMicrobioma);
  }

  async findAll(): Promise<Microbioma[]> {
    return await this.microbiomaRepository.find({
      order: {
        dcrMicrobioma: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Microbioma> {
    const microbioma = await this.microbiomaRepository.findOne({
      where: { codMicrobioma: id },
      relations: ['procedencias'],
    });

    if (!microbioma) {
      throw new NotFoundException(`Microbioma com ID ${id} não encontrada`);
    }

    return microbioma;
  }

  async update(
    id: number, 
    updateMicrobiomaDto: UpdateMicrobiomaDto,
  ): Promise<Microbioma> {
    const microbioma = await this.findOne(id);

    Object.assign(microbioma, updateMicrobiomaDto);

    return await this.microbiomaRepository.save(microbioma);
  }

  async remove(id: number): Promise<boolean> {
    const microbioma = await this.findOne(id);

    await this.microbiomaRepository.remove(microbioma);

    return true;
  }

  async searchByDescricao(descricao: string): Promise<Microbioma[]> {
    return await this.microbiomaRepository
      .createQueryBuilder('microbioma')
      .leftJoinAndSelect('microbioma.procedencias', 'procedencias')
      .where('LOWER(microbioma.dcrMicrobioma LIKE LOWER(:descricao', {
        descricao: `%${descricao}`
      })
      .orderBy('microbioma.dcrMicrobioma', 'ASC')
      .getMany();
  }

  async getEstatisticas(id: number): Promise<any> {
    const estatisticas = await this.microbiomaRepository
      .createQueryBuilder('microbioma')
      .leftJoin('microbioma.procedencias', 'procedencia')
      .select([
        'microbioma.codMicrobioma',
        'microbioma.dcrMicrobioma',
        'COUNT(procedencia.codProcedencia) as totalProcedencias'
      ])
      .where('microbioma.codMicrobioma = :id', { id })
      .groupBy('microbioma.codMicrobioma, microbioma.dcrMicrobioma')
      .getRawOne();

    return {
      codigo: estatisticas.microbioma_codMicrobioma,
      descricao: estatisticas.microbioma_dcrMicrobioma,
      totalProcedencias: parseInt(estatisticas.totalProcedencias) || 0,
    };
  }
}
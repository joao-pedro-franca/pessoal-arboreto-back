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
    @InjectRepository(Procedencia)
    private procedenciaRepository: Repository<Procedencia>,
  ) {}

  async create(createMicrobiomaDto: CreateMicrobiomaDto): Promise<Microbioma> {
    const novoMicrobioma = this.microbiomaRepository.create(createMicrobiomaDto);
    return await this.microbiomaRepository.save(novoMicrobioma);
  }

  async findAll(): Promise<Microbioma> {
    return await this.microbiomaRepository.find({
      order: {
        descricaoMicrobioma: 'ASC',
      },
    });
  }

  async findOne(id: number) Promise<Microbioma> {
    const microbioma = await this.microbiomaRepository.findOne({
      where: { codMicrobioma: id },
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
      .where('microbioma.descricaoMicrobioma LIKE :descricao', { 
        descricao: `%${descricao}%` 
      })
      .orderBy('microbioma.descricaoMicrobioma', 'ASC')
      .getMany();
  }

  async getEstatisticas(id: number): Promise<any> {
    const familia = await this.findOne(id);
    
    return {
      descricao: microbioma.descricaoMicrobioma,
      codigo: microbioma.codMicrobioma,
    };
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Procedencia } from './entities/procedencia.entity';
import { CreateProcedenciaDto } from './dto/create-procedencia.dto';
import { UpdateProcedenciaDto } from './dto/update-procedencia.dto';

@Injectable()
export class ProcedenciaService {
  constructor(
    @InjectRepository(Procedencia)
    private procedenciaRepository: Repository<Procedencia>,
  ) {} 

  async create(createProcedenciaDto: CreateProcedenciaDto) {
    const novaProcedencia = this.procedenciaRepository.create(createProcedenciaDto);
    return await this.procedenciaRepository.save(novaProcedencia);
  }

  async findAll(): Promise<Procedencia[]> {
    return await this.procedenciaRepository.find({
      relations: [
        // 'pais',
        'bioma',
        'microbioma',
        // 'classeProcedencia',
        // 'classeAmeaca',
        'especie',
        'arvore'
      ],
    });
  }

  async findOne(id: number): Promise<Procedencia> {
    const procedencia = await this.procedenciaRepository.findOne({
      where: { codProcedencia: id },
      relations: [
        // 'pais',
        'bioma',
        'microbioma',
        // 'classeProcedencia',
        // 'classeAmeaca',
        'especie',
        'arvore'
      ],
    });
    
    if (!procedencia) {
      throw new NotFoundException(`Procedência com ID ${id} não encontrada`);
    }

    return procedencia;
  }

  async update(id: number, updateProcedenciaDto: UpdateProcedenciaDto): Promise<Procedencia> {
    const procedencia = await this.findOne(id);

    Object.assign(procedencia, updateProcedenciaDto);

    return await this.procedenciaRepository.save(procedencia);
  }

  async remove(id: number): Promise<boolean> {
    const procedencia = await this.findOne(id);
    await this.procedenciaRepository.remove(procedencia);
    return true;
  }

  async updateRelacionamento(
    id: number,
    relacionamento: string,
    novoId: number | null
  ): Promise<Procedencia> {
    const procedencia = await this.findOne(id);

    const campo = `cod${relacionamento.charAt(0).toUpperCase() + relacionamento.slice(1)}`;
    procedencia[campo] = novoId;

    return await this.procedenciaRepository.save(procedencia);
  }

  async findByEspecie(codEspecie: number): Promise<Procedencia[]> {
    return await this.procedenciaRepository.find({
      where: { codEspecie },
      relations: ['pais', 'bioma', 'microbioma'],
    });
  }

  async findByMicrobioma(codMicrobioma: number): Promise<Procedencia[]> {
    return await this.procedenciaRepository.find({
      where: { codMicrobioma },
      relations: ['especie', 'pais', 'bioma'],
    });
  }

  async findSemRelacionamento(relacionamento: string): Promise<Procedencia[]> {
    const campo = `cod${relacionamento.charAt(0).toUpperCase() + relacionamento.slice(1)}`;

    return await this.procedenciaRepository.find({
      where: { [campo]: null },
      relations: ['pais', 'bioma', 'microbioma'],
    });
  }
}

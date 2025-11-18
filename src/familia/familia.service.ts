import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Familia } from './entities/familia.entity';
import { Especie } from '../especie/entities/especie.entity';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';

@Injectable()
export class FamiliaService {
  constructor(
    @InjectRepository(Familia)
    private familiaRepository: Repository<Familia>,
    @InjectRepository(Especie)
    private especieRepository: Repository<Especie>,
  ) {}

  async create(createFamiliaDto: CreateFamiliaDto): Promise<Familia> {
    const novaFamilia = this.familiaRepository.create(createFamiliaDto);
    return await this.familiaRepository.save(novaFamilia);
  }

  async findAll(): Promise<Familia[]> {
    return await this.familiaRepository.find({
      relations: ['especies'],
      order: {
        descricaoFamilia: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Familia> {
    const familia = await this.familiaRepository.findOne({
      where: { codFamilia: id },
      relations: ['especies'],
    });

    if (!familia) {
      throw new NotFoundException(`Família com ID ${id} não encontrada`);
    }

    return familia;
  }

  async findOneWithEspecies(id: number): Promise<Familia> {
    const familia = await this.familiaRepository.findOne({
      where: { codFamilia: id },
      relations: ['especies'],
    });

    if (!familia) {
      throw new NotFoundException(`Família com ID ${id} não encontrada`);
    }

    return familia;
  }

  async update(
    id: number,
    updateFamiliaDto: UpdateFamiliaDto,
  ): Promise<Familia> {
    const familia = await this.findOne(id);
    
    Object.assign(familia, updateFamiliaDto);
    
    return await this.familiaRepository.save(familia);
  }

  async remove(id: number): Promise<boolean> {
    const familia = await this.findOneWithEspecies(id);
    
    // Verifica se existem espécies associadas antes de remover
    if (familia.especies && familia.especies.length > 0) {
      throw new NotFoundException(
        `Não é possível remover a família pois existem ${familia.especies.length} espécies associadas`,
      );
    }

    await this.familiaRepository.remove(familia);
    return true;
  }

  async searchByDescricao(descricao: string): Promise<Familia[]> {
    return await this.familiaRepository
      .createQueryBuilder('familia')
      .leftJoinAndSelect('familia.especies', 'especies')
      .where('familia.descricaoFamilia LIKE :descricao', { 
        descricao: `%${descricao}%` 
      })
      .orderBy('familia.descricaoFamilia', 'ASC')
      .getMany();
  }

  async getEstatisticas(id: number): Promise<any> {
    const familia = await this.findOneWithEspecies(id);
    
    const estatisticas = {
      totalEspecies: familia.especies ? familia.especies.length : 0,
      especies: familia.especies ? familia.especies.map(especie => ({
        nomeCientifico: especie.nomeCientifico,
        nomePopular: especie.nomePopular,
      })) : [],
    };

    return estatisticas;
  }
}
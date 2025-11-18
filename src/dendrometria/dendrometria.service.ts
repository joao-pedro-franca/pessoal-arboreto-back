import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDendrometriaDto } from './dto/create-dendrometria.dto';
import { UpdateDendrometriaDto } from './dto/update-dendrometria.dto';
import { Dendrometria } from './entities/dendrometria.entity';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Injectable()
export class DendrometriaService {
  constructor(
    @InjectRepository(Dendrometria)
    private dendrometriaRepository: Repository<Dendrometria>,
    @InjectRepository(Arvore)
    private arvoreRepository: Repository<Arvore>,
  ) {}

  async create(createDto: CreateDendrometriaDto): Promise<Dendrometria> {
    const { arvoreId, dataDendrometria, vlrAltura, vlrDap, vlrDiametroCopa } = createDto;

    const arvore = await this.arvoreRepository.findOne({ where: { codArvore: arvoreId } });
    if (!arvore) {
      throw new NotFoundException(`Árvore com ID ${arvoreId} não encontrada`);
    }

    const entidade = this.dendrometriaRepository.create({
      dataDendrometria: new Date(dataDendrometria),
      vlrAltura: Number(vlrAltura).toFixed(2),
      vlrDap: Number(vlrDap).toFixed(2),
      vlrDiametroCopa: Number(vlrDiametroCopa).toFixed(2),
      arvore,
    });

    return await this.dendrometriaRepository.save(entidade);
  }

  async findAll(): Promise<Dendrometria[]> {
    return await this.dendrometriaRepository.find({ relations: ['arvore'] });
  }

  async findOne(id: number): Promise<Dendrometria> {
    const entidade = await this.dendrometriaRepository.findOne({
      where: { codDendrometria: id },
      relations: ['arvore'],
    });
    if (!entidade) {
      throw new NotFoundException(`Dendrometria com ID ${id} não encontrada`);
    }
    return entidade;
  }

  async update(id: number, updateDto: UpdateDendrometriaDto): Promise<Dendrometria> {
    const entidade = await this.findOne(id);

    if (updateDto.arvoreId) {
      const arvore = await this.arvoreRepository.findOne({ where: { codArvore: updateDto.arvoreId } });
      if (!arvore) {
        throw new NotFoundException(`Árvore com ID ${updateDto.arvoreId} não encontrada`);
      }
      entidade.arvore = arvore;
    }

    if (updateDto.dataDendrometria) {
      (entidade as any).dataDendrometria = new Date(updateDto.dataDendrometria);
    }

    if (updateDto.vlrAltura !== undefined) {
      (entidade as any).vlrAltura = Number(updateDto.vlrAltura).toFixed(2);
    }
    if (updateDto.vlrDap !== undefined) {
      (entidade as any).vlrDap = Number(updateDto.vlrDap).toFixed(2);
    }
    if (updateDto.vlrDiametroCopa !== undefined) {
      (entidade as any).vlrDiametroCopa = Number(updateDto.vlrDiametroCopa).toFixed(2);
    }

    return await this.dendrometriaRepository.save(entidade);
  }

  async remove(id: number): Promise<boolean> {
    const entidade = await this.findOne(id);
    await this.dendrometriaRepository.remove(entidade);
    return true;
  }
}


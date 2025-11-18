import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExsicataDto } from './dto/create-exsicata.dto';
import { UpdateExsicataDto } from './dto/update-exsicata.dto';
import { Exsicata } from './entities/exsicata.entity';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Injectable()
export class ExsicataService {
  constructor(
    @InjectRepository(Exsicata)
    private exsicataRepository: Repository<Exsicata>,
    @InjectRepository(Arvore)
    private arvoreRepository: Repository<Arvore>,
  ) {}

  async create(createExsicataDto: CreateExsicataDto): Promise<Exsicata> {
    const { arvoreId, dataExsicata, ...dados } = createExsicataDto;

    const arvore = await this.arvoreRepository.findOne({
      where: { codArvore: arvoreId },
    });

    if (!arvore) {
      throw new NotFoundException(`Árvore com ID ${arvoreId} não encontrada`);
    }

    const entidade = this.exsicataRepository.create({
      ...dados,
      dataExsicata: new Date(dataExsicata),
      arvore,
    });

    return await this.exsicataRepository.save(entidade);
  }

  async findAll(): Promise<Exsicata[]> {
    return await this.exsicataRepository.find({
      relations: ['arvore'],
    });
  }

  async findOne(id: number): Promise<Exsicata> {
    const entidade = await this.exsicataRepository.findOne({
      where: { codExsicata: id },
      relations: ['arvore'],
    });

    if (!entidade) {
      throw new NotFoundException(`Exsicata com ID ${id} não encontrada`);
    }

    return entidade;
  }

  async update(id: number, updateExsicataDto: UpdateExsicataDto): Promise<Exsicata> {
    const entidade = await this.findOne(id);

    if (updateExsicataDto.arvoreId) {
      const arvore = await this.arvoreRepository.findOne({
        where: { codArvore: updateExsicataDto.arvoreId },
      });
      if (!arvore) {
        throw new NotFoundException(`Árvore com ID ${updateExsicataDto.arvoreId} não encontrada`);
      }
      entidade.arvore = arvore;
    }

    Object.assign(entidade, {
      ...updateExsicataDto,
      dataExsicata: updateExsicataDto.dataExsicata
        ? new Date(updateExsicataDto.dataExsicata)
        : entidade.dataExsicata,
    });

    return await this.exsicataRepository.save(entidade);
  }

  async remove(id: number): Promise<boolean> {
    const entidade = await this.findOne(id);
    await this.exsicataRepository.remove(entidade);
    return true;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from './entities/especie.entity';
import { Familia } from '../familia/entities/familia.entity';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class EspecieService {
  constructor(
    @InjectRepository(Especie)
    private especieRepository: Repository<Especie>,
    @InjectRepository(Familia)
    private familiaRepository: Repository<Familia>,
  ) { }

  async create(createEspecieDto: CreateEspecieDto): Promise<Especie> {
    const { familiaId, ...especieData } = createEspecieDto;
    console.log(familiaId);
    const familia = await this.familiaRepository.findOne({
      where: { codFamilia: familiaId },
    });

    console.log(familia);

    if (!familia) {
      throw new NotFoundException(
        `Espécie com ID ${createEspecieDto.familiaId} não encontrada`,
      );
    }


    const novaEspecie = this.especieRepository.create({ ...especieData, familia });

    return await this.especieRepository.save(novaEspecie);
  }


  async findAll(): Promise<Especie[]> {
    return await this.especieRepository.find({
      relations: ['familia', 'arvores'],
    });
  }

  async findOne(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOne({
      where: { codEspecie: id },
      relations: ['familia', 'arvores'],
    });

    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada`);
    }

    return especie;
  }

  async findOneWithArvores(id: number): Promise<Especie> {
    const especie = await this.especieRepository.findOne({
      where: { codEspecie: id },
      relations: ['arvores'],
    });

    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada`);
    }

    return especie;
  }

  async findByFamilia(familiaId: number): Promise<Especie[]> {
    return await this.especieRepository.find({
      where: { familia: { codFamilia: familiaId } },
      relations: ['familia'],
    });
  }

  async update(
    id: number,
    updateEspecieDto: UpdateEspecieDto,
  ): Promise<Especie> {
    const especie = await this.findOne(id);

    if (updateEspecieDto.familiaId) {
      const familia = await this.familiaRepository.findOne({
        where: { codFamilia: updateEspecieDto.familiaId },
      });

      if (!familia) {
        throw new NotFoundException(
          `Família com ID ${updateEspecieDto.familiaId} não encontrada`,
        );
      }

      especie.familia = familia;
    } else if (updateEspecieDto.familiaId === null) {
      // Permite remover a relação com família
      (especie as any).familia = null;
    }

    // Atualiza os outros campos
    Object.assign(especie, updateEspecieDto);

    return await this.especieRepository.save(especie);
  }

  async remove(id: number): Promise<boolean> {
    const especie = await this.findOne(id);

    // Verifica se existem arvores associados antes de remover
    const especieComArvores = await this.findOneWithArvores(id);

    if (especieComArvores.arvores && especieComArvores.arvores.length > 0) {
      throw new NotFoundException(
        `Não é possível remover a espécie pois existem ${especieComArvores.arvores.length} arvores associados`,
      );
    }

    await this.especieRepository.remove(especie);
    return true;
  }

  async searchByNome(nome: string): Promise<Especie[]> {
    return await this.especieRepository
      .createQueryBuilder('especie')
      .leftJoinAndSelect('especie.familia', 'familia')
      .where('especie.nomeCientifico LIKE :nome', { nome: `%${nome}%` })
      .orWhere('especie.nomePopular LIKE :nome', { nome: `%${nome}%` })
      .orWhere('especie.sinonimiaCientifica LIKE :nome', { nome: `%${nome}%` })
      .orWhere('especie.sinonimiaComum LIKE :nome', { nome: `%${nome}%` })
      .getMany();
  }
}
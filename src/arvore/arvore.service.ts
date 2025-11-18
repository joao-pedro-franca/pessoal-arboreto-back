import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arvore } from './entities/arvore.entity';
import { CreateArvoreDto } from './dto/create-arvore.dto';
import { UpdateArvoreDto } from './dto/update-arvore.dto';
import { Especie } from '../especie/entities/especie.entity';
import { Dendrometria } from 'src/dendrometria/entities/dendrometria.entity';
import { Exsicata } from 'src/exsicata/entities/exsicata.entity';

@Injectable()
export class ArvoreService {
  constructor(
    @InjectRepository(Arvore)
    private arvoreRepository: Repository<Arvore>,
    @InjectRepository(Especie)
    private especieRepository: Repository<Especie>,
    @InjectRepository(Dendrometria)
    private dendrometriaRepository: Repository<Dendrometria>,
    @InjectRepository(Exsicata)
    private exsicataRepository: Repository<Exsicata>,
  ) {}

  async create(createArvoreDto: CreateArvoreDto): Promise<Arvore> {


    const { especieId, ...arvoreData } = createArvoreDto;
    console.log(especieId);
    const especie = await this.especieRepository.findOne({
      where: { codEspecie: especieId },
    });
    console.log(especie);

    if (!especie) {
      throw new NotFoundException(
        `Espécie com ID ${especieId} não encontrada`,
      );
    }

    const novaArvore = this.arvoreRepository.create({
      ...arvoreData,
      especie,
    });

    return await this.arvoreRepository.save(novaArvore);
  }

  async findAll(): Promise<Arvore[]> {
    return await this.arvoreRepository.find({
      relations: ['especie', 'dendrometrias', 'exsicatas'],
    });
  }

  async findOne(id: number): Promise<Arvore> {
    const arvore = await this.arvoreRepository.findOne({
      where: { codArvore: id },
      relations: ['especie', 'dendrometrias', 'exsicatas'],
    });

    if (!arvore) {
      throw new NotFoundException(`Árvore com ID ${id} não encontrada`);
    }

    return arvore;
  }

  async update(
    id: number,
    updateArvoreDto: UpdateArvoreDto,
  ): Promise<Arvore> {
    const arvore = await this.findOne(id);

    if (updateArvoreDto.especieId) {
      const especie = await this.especieRepository.findOne({
        where: { codEspecie: updateArvoreDto.especieId },
      });

      if (!especie) {
        throw new NotFoundException(
          `Espécie com ID ${updateArvoreDto.especieId} não encontrada`,
        );
      }

      arvore.especie = especie;
    }

    // Atualiza os outros campos
    Object.assign(arvore, updateArvoreDto);

    return await this.arvoreRepository.save(arvore);
  }

  async remove(id: number): Promise<boolean> {
    const arvore = await this.findOne(id);
    await this.arvoreRepository.remove(arvore);
    return true;
  }
}
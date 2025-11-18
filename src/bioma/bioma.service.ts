import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bioma } from './entities/bioma.entity';
import { CreateBiomaDto } from './dto/create-bioma.dto';
import { UpdateBiomaDto } from './dto/update-bioma.dto';

@Injectable()
export class BiomaService {
  constructor(
    @InjectRepository(Bioma)
    private readonly biomaRepository: Repository<Bioma>,
  ) {}

  async create(dto: CreateBiomaDto): Promise<Bioma> {
    const bioma = this.biomaRepository.create(dto);
    return this.biomaRepository.save(bioma);
  }

  async findAll(): Promise<Bioma[]> {
    return this.biomaRepository.find();
  }

  async findOne(id: number): Promise<Bioma> {
    const bioma = await this.biomaRepository.findOne({
      where: { codBioma: id },
    });

    if (!bioma) {
      throw new NotFoundException(`Bioma com id ${id} não encontrado`);
    }

    return bioma;
  }

  async update(id: number, dto: UpdateBiomaDto): Promise<Bioma> {
    const bioma = await this.findOne(id);
    Object.assign(bioma, dto);
    return this.biomaRepository.save(bioma);
  }

  async remove(id: number): Promise<void> {
    const bioma = await this.findOne(id);
    await this.biomaRepository.remove(bioma);
  }
}

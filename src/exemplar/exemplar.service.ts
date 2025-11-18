import { Injectable } from '@nestjs/common';
import { CreateExemplarDto } from './dto/create-exemplar.dto';
import { UpdateExemplarDto } from './dto/update-exemplar.dto';
import { Repository } from 'typeorm';
import { Exemplar } from './entities/exemplar.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExemplarService {

  constructor(
    @InjectRepository(Exemplar)
    private readonly repository: Repository<Exemplar>,
  ) { }


  create(createExemplarDto: CreateExemplarDto) {
    const exemplar = this.repository.create(createExemplarDto);
    return this.repository.save(exemplar);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateExemplarDto: UpdateExemplarDto) {
    const exemplar = await this.repository.findOneBy({ id });
    if (!exemplar) {
      return null;
    }
    this.repository.merge(exemplar, updateExemplarDto);
    return this.repository.save(exemplar);
  }

  async remove(id: string) {
    const exemplar = await this.repository.findOneBy({ id });
    if (!exemplar) {
      return null;
    }
    return this.repository.remove(exemplar);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { ExemplarService } from './exemplar.service';
import { CreateExemplarDto } from './dto/create-exemplar.dto';
import { UpdateExemplarDto } from './dto/update-exemplar.dto';

@Controller('exemplar')
export class ExemplarController {
  constructor(private readonly exemplarService: ExemplarService) { }

  @Post()
  create(@Body() createExemplarDto: CreateExemplarDto) {
    return this.exemplarService.create(createExemplarDto);
  }

  @Get()
  findAll() {
    return this.exemplarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exemplar = await this.exemplarService.findOne(id);
    if (!exemplar)
      throw new NotFoundException(`Exemplar with ID ${id} not found`);

    return exemplar;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExemplarDto: UpdateExemplarDto) {
    const exemplar = await this.exemplarService.update(id, updateExemplarDto);
    if (!exemplar)
      throw new NotFoundException(`Exemplar with ID ${id} not found`);
    return exemplar;
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const exemplar = await this.exemplarService.remove(id);
    if (!exemplar)
      throw new NotFoundException(`Exemplar with ID ${id} not found`);
  }
}

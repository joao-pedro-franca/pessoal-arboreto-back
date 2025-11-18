import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@Controller('especie')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @Get()
  findAll() {
    return this.especieService.findAll();
  }

  @Get('search')
  search(@Query('nome') nome: string) {
    return this.especieService.searchByNome(nome);
  }

  @Get('familia/:familiaId')
  findByFamilia(@Param('familiaId') familiaId: number) {
    return this.especieService.findByFamilia(familiaId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.especieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(id, updateEspecieDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.especieService.remove(id);
  }
}
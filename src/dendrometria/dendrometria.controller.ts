import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DendrometriaService } from './dendrometria.service';
import { CreateDendrometriaDto } from './dto/create-dendrometria.dto';
import { UpdateDendrometriaDto } from './dto/update-dendrometria.dto';

@Controller('dendrometria')
export class DendrometriaController {
  constructor(private readonly dendrometriaService: DendrometriaService) {}

  @Post()
  create(@Body() dto: CreateDendrometriaDto) {
    return this.dendrometriaService.create(dto);
  }

  @Get()
  findAll() {
    return this.dendrometriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dendrometriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDendrometriaDto) {
    return this.dendrometriaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dendrometriaService.remove(+id);
  }
}



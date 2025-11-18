import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcedenciaService } from './procedencia.service';
import { CreateProcedenciaDto } from './dto/create-procedencia.dto';
import { UpdateProcedenciaDto } from './dto/update-procedencia.dto';

@Controller('procedencia')
export class ProcedenciaController {
  constructor(private readonly procedenciaService: ProcedenciaService) {}

  @Post()
  create(@Body() createProcedenciaDto: CreateProcedenciaDto) {
    return this.procedenciaService.create(createProcedenciaDto);
  }

  @Get()
  findAll() {
    return this.procedenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcedenciaDto: UpdateProcedenciaDto) {
    return this.procedenciaService.update(+id, updateProcedenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedenciaService.remove(+id);
  }



  /*
  // para teste
  @Get('test/all')
  async testAll() {
    return this.procedenciaService.testProcedencia();
  }

  @Get('microbioma/:microbiomaId')
  async findByMicrobioma(@Param('microbiomaId') microbiomaId: string) {
    return this.procedenciaService.findByMicrobioma(+microbiomaId);
  }

  @Get('especie/:especieId')
  async findByEspecie(@Param('especieId') especieId: string) {
    return this.procedenciaService.findByEspecie(+especieId);
  */
}
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  HttpCode,
  ParseIntPipe 
} from '@nestjs/common';
import { FamiliaService } from './familia.service';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';

@Controller('familia')
export class FamiliaController {
  constructor(private readonly familiaService: FamiliaService) {}

  @Post()
  create(@Body() createFamiliaDto: CreateFamiliaDto) {
    return this.familiaService.create(createFamiliaDto);
  }

  @Get()
  findAll() {
    return this.familiaService.findAll();
  }

  @Get('search')
  search(@Query('descricao') descricao: string) {
    return this.familiaService.searchByDescricao(descricao);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.familiaService.findOne(id);
  }

  @Get(':id/estatisticas')
  getEstatisticas(@Param('id', ParseIntPipe) id: number) {
    return this.familiaService.getEstatisticas(id);
  }

  @Get(':id/especies')
  findOneWithEspecies(@Param('id', ParseIntPipe) id: number) {
    return this.familiaService.findOneWithEspecies(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateFamiliaDto: UpdateFamiliaDto
  ) {
    return this.familiaService.update(id, updateFamiliaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.familiaService.remove(id);
  }
}
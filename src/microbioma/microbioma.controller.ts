import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query 
} from '@nestjs/common';

import { MicrobiomaService } from './microbioma.service';
import { CreateMicrobiomaDto } from './dto/create-microbioma.dto';
import { UpdateMicrobiomaDto } from './dto/update-microbioma.dto';

@Controller('microbioma')
export class MicrobiomaController {
  constructor(private readonly microbiomaService: MicrobiomaService) {}

  @Post()
  create(@Body() createMicrobiomaDto: CreateMicrobiomaDto) {
    return this.microbiomaService.create(createMicrobiomaDto);
  }

  @Get()
  findAll() {
    return this.microbiomaService.findAll();
  }

  @Get('search')
  searchByDescricao(@Query('descricao') descricao: string) {
    return this.microbiomaService.searchByDescricao(descricao);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microbiomaService.findOne(+id);
  }

  @Get(':id/estatisticas')
  getEstatisticas(@Param('id') id: string) {
    return this.microbiomaService.getEstatisticas(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMicrobiomaDto: UpdateMicrobiomaDto
  ) {
    return this.microbiomaService.update(+id, updateMicrobiomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microbiomaService.remove(+id);
  }
}
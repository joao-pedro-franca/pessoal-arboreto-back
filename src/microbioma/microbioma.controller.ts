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
  search(@Query('descricao') descricao: string) {
    return this.microbiomaService.searchByDescricao(descricao);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.microbiomaService.findOne(id);
  }

  @Get(':id/estatisticas')
  getEstatisticas(@Param('id', ParseIntPipe) id: number) {
    return this.microbiomaService.getEstatisticas(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateMicrobiomaDto: UpdateMicrobiomaDto
  ) {
    return this.microbiomaService.update(id, updateMicrobiomaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.microbiomaService.remove(id);
  }
}
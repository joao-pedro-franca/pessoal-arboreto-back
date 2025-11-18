import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { ArvoreService } from './arvore.service';
import { CreateArvoreDto } from './dto/create-arvore.dto';
import { UpdateArvoreDto } from './dto/update-arvore.dto';

@Controller('arvore')
export class ArvoreController {
  constructor(private readonly arvoreService: ArvoreService) { }

  @Post()
  create(@Body() createArvoreDto: CreateArvoreDto) {
    return this.arvoreService.create(createArvoreDto);
  }

  @Get()
  findAll() {
    return this.arvoreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const arvore = await this.arvoreService.findOne(id);
    if (!arvore) {
      throw new NotFoundException(`Arvore with ID ${id} not found`);
    }
    return arvore;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateArvoreDto: UpdateArvoreDto) {
    const arvore = await this.arvoreService.update(id, updateArvoreDto);
    if (!arvore) {
      throw new NotFoundException(`Arvore with ID ${id} not found`);
    }
    return arvore;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const result = await this.arvoreService.remove(id);
    if (!result) {
      throw new NotFoundException(`Arvore with ID ${id} not found`);
    }
  }
}

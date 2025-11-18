import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExsicataService } from './exsicata.service';
import { CreateExsicataDto } from './dto/create-exsicata.dto';
import { UpdateExsicataDto } from './dto/update-exsicata.dto';

@Controller('exsicata')
export class ExsicataController {
  constructor(private readonly exsicataService: ExsicataService) {}

  @Post()
  create(@Body() createExsicataDto: CreateExsicataDto) {
    return this.exsicataService.create(createExsicataDto);
  }

  @Get()
  findAll() {
    return this.exsicataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exsicataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExsicataDto: UpdateExsicataDto) {
    return this.exsicataService.update(+id, updateExsicataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exsicataService.remove(+id);
  }
}

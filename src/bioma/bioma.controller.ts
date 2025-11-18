import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { BiomaService } from './bioma.service';
import { CreateBiomaDto } from './dto/create-bioma.dto';
import { UpdateBiomaDto } from './dto/update-bioma.dto';

@Controller('bioma')
export class BiomaController {
  constructor(private readonly biomaService: BiomaService) {}

  @Post()
  create(@Body() createBiomaDto: CreateBiomaDto) {
    return this.biomaService.create(createBiomaDto);
  }

  @Get()
  findAll() {
    return this.biomaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.biomaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBiomaDto: UpdateBiomaDto,
  ) {
    return this.biomaService.update(id, updateBiomaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.biomaService.remove(id);
  }
}

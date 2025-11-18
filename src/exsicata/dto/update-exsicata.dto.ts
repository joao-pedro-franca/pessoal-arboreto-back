import { PartialType } from '@nestjs/mapped-types';
import { CreateExsicataDto } from './create-exsicata.dto';

export class UpdateExsicataDto extends PartialType(CreateExsicataDto) {}

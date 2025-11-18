import { PartialType } from '@nestjs/mapped-types';
import { CreateMicrobiomaDto } from './create-microbioma.dto';

export class UpdateMicrobiomaDto extends PartialType(CreateMicrobiomaDto) {}

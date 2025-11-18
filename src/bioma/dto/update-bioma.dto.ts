import { PartialType } from '@nestjs/mapped-types';
import { CreateBiomaDto } from './create-bioma.dto';

export class UpdateBiomaDto extends PartialType(CreateBiomaDto) {}

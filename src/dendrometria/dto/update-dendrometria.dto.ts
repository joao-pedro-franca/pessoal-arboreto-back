import { PartialType } from '@nestjs/mapped-types';
import { CreateDendrometriaDto } from './create-dendrometria.dto';

export class UpdateDendrometriaDto extends PartialType(CreateDendrometriaDto) {}

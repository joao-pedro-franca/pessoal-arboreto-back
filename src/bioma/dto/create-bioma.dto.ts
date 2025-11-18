import { IsString } from 'class-validator';

export class CreateBiomaDto {
  @IsString()
  descricaoBioma: string;
}

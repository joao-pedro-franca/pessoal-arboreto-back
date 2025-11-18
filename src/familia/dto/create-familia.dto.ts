import { IsDateString, IsNumber, IsString } from "class-validator";


export class CreateFamiliaDto {

    @IsString()
    descricaoFamilia: string;
}

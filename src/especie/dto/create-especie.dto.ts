import { IsDateString, isNumber, IsNumber, IsString } from "class-validator";


export class CreateEspecieDto {


    @IsString()
    nomeCientifico: string;

    @IsString()
    sinonimiaCientifica: string;

    @IsString()
    nomePopular: string;

    @IsString()
    sinonimiaComum: string;

    @IsNumber()
    familiaId: number;
}

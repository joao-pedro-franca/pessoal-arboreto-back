import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateArvoreDto {

    @IsString()
    numIdentificacao: string;

    @IsString()
    local: string;

    @IsString()
    projeto: string;

    @IsString()
    quadraParcela: string;

    @IsNumber()
    especieId: number;
}

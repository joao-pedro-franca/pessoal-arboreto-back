import { IsDateString, IsNumber, IsString } from "class-validator";


export class CreateMicrobiomaDto {

    @IsString()
    descricaoMicrobioma: string;
}

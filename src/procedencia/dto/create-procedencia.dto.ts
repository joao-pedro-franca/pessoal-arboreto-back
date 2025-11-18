import { IsOptional, IsNumber } from "class-validator";

export class CreateProcedenciaDto {
    // codPais?: number;

    @IsOptional()
    @IsNumber()
    codBioma?: number;

    @IsOptional()
    @IsNumber()
    codMicrobioma?: number;
    // codClasseProcedencia?: number;
    // codClasseAmeaca?: number;
    @IsOptional()
    @IsNumber()
    codArvore?: number;
    
    @IsOptional()
    @IsNumber()
    codEspecie?: number;
}


import { isDateString, isNumber, isString } from "class-validator";

export class CreateProcedenciaDto {
    codPais?: number;
    codBioma?: number;
    codMicrobioma?: number;
    codClasseProcedencia?: number;
    codClasseAmeaca?: number;
    codArvore?: number;
    codEspecie?: number;
}

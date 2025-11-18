import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMicrobiomaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    dcrMicrobioma: string;
}

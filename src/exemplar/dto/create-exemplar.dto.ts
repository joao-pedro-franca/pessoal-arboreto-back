import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateExemplarDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    sizeHeight: number;

    @IsNumber()
    sizeWidth: number;

    @IsDateString()
    dateOfplanted: string;
}

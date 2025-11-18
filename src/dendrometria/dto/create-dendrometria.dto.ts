import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDendrometriaDto {
	@IsDateString()
	@IsNotEmpty()
	dataDendrometria: string;

	@Transform(({ value }) => value === '' || value === null || value === undefined ? value : Number(value))
	@IsNumber()
	@IsNotEmpty()
	vlrAltura: number;

	@Transform(({ value }) => value === '' || value === null || value === undefined ? value : Number(value))
	@IsNumber()
	@IsNotEmpty()
	vlrDap: number;

	@Transform(({ value }) => value === '' || value === null || value === undefined ? value : Number(value))
	@IsNumber()
	@IsNotEmpty()
	vlrDiametroCopa: number;

	@Transform(({ value }) => value === '' || value === null || value === undefined ? value : Number(value))
	@IsNumber()
	@IsNotEmpty()
	arvoreId: number;
}


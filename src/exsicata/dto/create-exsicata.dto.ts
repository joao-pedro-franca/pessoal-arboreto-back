import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateExsicataDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	dcrExsicata: string;

	@IsDateString()
	@IsNotEmpty()
	dataExsicata: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	nomeAutor: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	codHerbario: string;

	@IsNumber()
	@IsNotEmpty()
	arvoreId: number;
}

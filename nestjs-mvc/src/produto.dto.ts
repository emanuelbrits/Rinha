import { IsInt, IsNotEmpty, MaxLength, Min, Max } from 'class-validator'
import { ProdutoStatus } from './produto';

export class ProdutoDto {

	id: string;
	
	@IsNotEmpty()
	@MaxLength(32)
    nome: string;

	@IsNotEmpty()
	status: ProdutoStatus;

	@IsNotEmpty()
	@MaxLength(180)
	destinacao: string;

	@IsInt()
    @Min(1)
    @Max(20)
	TaxaRentabilidadeAA: number;
	
	@IsInt()
	@Min(0)
	@Max(100)
	TaxaAdministracao: number

	@IsInt()
    @Min(0)
    @Max(48)
	datavencimento: Date;

	prazo: number;

	liquidezDiaria: string;
}
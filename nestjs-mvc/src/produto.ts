export enum ProdutoStatus {
	DISPONIVEL = 'Disponível',
	INDISPONIVEL = 'Indisponível',
}

export class Produto {
    id: string;
	nome: string;
	status: ProdutoStatus;
	destinacao: string;
	TaxaRentabilidadeAA: number;
	TaxaAdministracao: number
	datavencimento: Date;
	prazo: number;
	liquidezDiaria: string;
}
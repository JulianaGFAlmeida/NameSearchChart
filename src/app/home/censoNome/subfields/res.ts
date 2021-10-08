export class Res{
	nome : string;
	periodo : string;
	frequencia : number;
	ranking : number;

	constructor()
	constructor(nome : string, periodo : string, frequencia : number, ranking : number)
	constructor(nome ?: string, periodo ?: string, frequencia ?: number, ranking ?: number){
		this.nome = nome;
		this.periodo = periodo;
		this.frequencia = frequencia;
		this.ranking = ranking;
	}

}
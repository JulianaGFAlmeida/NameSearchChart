import { Res } from "./subfields/res";

export class CensoNome{
	nome : string;
	sexo : string;
	localidade : string;
	res : Res[];


	constructor()
	constructor(nome : string, sexo : string, localidade : string, res : Res[])
	constructor(nome ?: string, sexo ?: string, localidade ?: string, res ?: Res[]){
		this.nome = nome;
		this.sexo = sexo;
		this.localidade = localidade;
		this.res = res;
	}
	

}
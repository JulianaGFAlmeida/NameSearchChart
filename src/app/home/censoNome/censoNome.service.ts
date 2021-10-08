import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CensoNome } from "./censoNome";

@Injectable()
export class CensoNomeService{
	url = "https://servicodados.ibge.gov.br/api/v2/censos/nomes/";
	headers : HttpHeaders = new HttpHeaders();
	constructor(private http : HttpClient){
		this.headers.set('Access-Control-Allow-Origin', '*');
		this.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		this.headers.set('Access-Control-Allow-Headers', 'Content-Type');
		this.headers.set('Access-Control-Allow-Credentials', "true");
	}

	getByNome(nome : string) : Observable<CensoNome>{
		return this.http.get<CensoNome>(this.url+nome,{headers : this.headers});
	} 

	getSortedByRanking(sex ?: string) : Observable<CensoNome>{
		let addToUrl="ranking";
		if(sex){
			addToUrl +="?sexo="+sex;
		}
		return this.http.get<CensoNome>(this.url+addToUrl,{headers : this.headers});
	}
	

}
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { CensoNome } from './censoNome/censoNome';
import { CensoNomeService } from './censoNome/censoNome.service';

const SEXOS = [{"nome" : "FEMININO","valor":"F"},{"nome" : "MASCULINO","valor":"M"}]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nomes : CensoNome = new CensoNome();
  qtdResultados=5;
  inicioPorPag = [];
  fimPorPag = [];
  idxPaginas=0;
  sexos = SEXOS;
  selected = "TODOS";
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie'; 
  public pieChartLegend = true;
  public pieChartPlugins = [];
  backgroundColorDefault: string[] = ['#3D139E','#A078FF','#591CE8','#42306B','#4616B8'];
  backgroundColorF : string[] =["#F24182","#EA85AA","#E63E7B","#663A4A","#B33060"];
  backgroundColorM : string[] =["#41B7BF","#96E4EA","#4EDBE6","#416466","#3EB0B8"];
  public pieChartColors: Array < any > = [{backgroundColor: this.backgroundColorDefault
 }];
  
  constructor(private service : CensoNomeService) {
     }

  ngOnInit(): void {
    this.getNomes();
    
  }
  fillChart(){
    this.pieChartLabels = [];
    this.pieChartData = [];
    for(let i = this.inicioPorPag[this.idxPaginas];i < this.fimPorPag[this.idxPaginas];i++){
      this.pieChartLabels.push(this.nomes.res[i].nome);
      this.pieChartData.push(this.nomes.res[i].frequencia);
    }
  }
  calcQtdPags(){
    let lengthArray = this.nomes.res.length;
    let restSize = (this.nomes.res.length%this.qtdResultados);
    let sizeArray = (this.nomes.res.length/this.qtdResultados)+restSize;
    this.inicioPorPag =   [];
    this.fimPorPag =   [];
    for(let i = 0; i < sizeArray; i++){
      if(restSize == 0 || (i*this.qtdResultados) < lengthArray){
        this.inicioPorPag.push(i*this.qtdResultados);
        this.fimPorPag.push((i+1)*this.qtdResultados)
      }else {
        this.inicioPorPag.push(lengthArray-restSize-1);
        this.fimPorPag.push(lengthArray);

      }
    }
  }
  setPagesBeingShown(idx : number){
    this.idxPaginas = idx;
    this.fillChart();
  }
  changePage(previousPage : boolean){
    if(previousPage){
      this.idxPaginas = (this.idxPaginas-1 >= 0) ? this.idxPaginas-1 : 0;
    }else{
      this.idxPaginas = (this.idxPaginas+1 < this.inicioPorPag.length) ? this.idxPaginas+1 : this.inicioPorPag.length-1; 
    }
    this.fillChart();
 
  }

  getNomes(sex ?: string){
    this.idxPaginas = 0;
    this.service.getSortedByRanking(sex).subscribe((result)=>{
      console.log(result);
      this.nomes = result[0];
      this.calcQtdPags();
      this.colorChart(sex);
    this.fillChart();
    })
  }

  colorChart(sex ?: string){
    switch(sex){
      case "F":
        this.pieChartColors[0].backgroundColor = this.backgroundColorF;
        break;
        case "M":
          this.pieChartColors[0].backgroundColor = this.backgroundColorM;
          break;
          default:
            this.pieChartColors[0].backgroundColor = this.backgroundColorDefault;
            break;

  }
  }

}

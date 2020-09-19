import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Empresa } from 'app/models/Empresa';
import { ActividadesResumenResponse, EmpresaResponse, LogisticState, RutasResponse } from 'app/ngxs/logistic.state';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';

class ChartData implements ChartDataSets {
}


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  @Select(LogisticState.getActividadesResumen) actividadesResumenMant$: Observable<ActividadesResumenResponse>;
  @Select(LogisticState.getEmpresa) empresaMant$: Observable<EmpresaResponse>;
  @Select(LogisticState.getRutas) rutasMant$: Observable<RutasResponse>;
  empresa: Empresa;
  totalKm: number;
  kmPorEquipo: number;

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };
  public scatterChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  data: Array<any>;

  scatterChartData: ChartData[];
  public scatterChartType: ChartType = 'scatter';

  constructor() { 
    this.empresa = new Empresa();
  }

  ngOnInit() {
    this.rutasMant$.subscribe(rutasMant => {
      this.totalKm = rutasMant.totalKm;
      this.kmPorEquipo = rutasMant.kmPorEquipo;
    })

    this.empresaMant$.subscribe(empresa => {
      if (empresa && empresa.empresa){
        this.empresa = empresa.empresa;
      }
    });

    this.actividadesResumenMant$.subscribe(resumen => {
      if (resumen.calculoActividadesRuta){
        this.scatterChartData = [
          {
            data: resumen.calculoActividadesRuta.map(item => {
              return {
                x: item.distancia,
                y: item.costoxKmTotal
              }
            }),
            label: 'Series A',
            pointRadius: 10,
          },
        ];
      }
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

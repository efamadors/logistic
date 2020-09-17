import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Actividad } from 'app/models/Actividades';
import { Ruta } from 'app/models/Ruta';
import { TipoVehiculoCargaTerrestre } from 'app/models/TipoVehiculoCargaTerrestre';
import { AddCantidadCargaTransportarAction, CalcularActividadesResumenAction } from 'app/ngxs/logistic.actions';
import { LogisticState } from 'app/ngxs/logistic.state';
import { DatabaseService } from 'app/services/database.service';
import { GeneralService } from 'app/services/general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-distribucion-costo',
  templateUrl: './distribucion-costo.component.html',
  styleUrls: ['./distribucion-costo.component.scss']
})
export class DistribucionCostoComponent implements OnInit {
  nombreEmpresa: string ;
  cantidadContenedores: number;
  totalKm: number;
  costoKm: number;
  rutas: Ruta[];
  indicadoresApoyo: Actividad[];
  indicadoresFundamentales: Actividad[];
  otrasActividades: Actividad[];
  @Select(LogisticState.getCantidadCargaTransportar) cantidadCargaTransportar$: Observable<number>;
  
  constructor(private database: DatabaseService, private store: Store) {
    this.rutas = new Array<Ruta>();
    this.indicadoresFundamentales = new Array<Actividad>();
    this.otrasActividades = new Array<Actividad>();
    this.indicadoresApoyo = new Array<Actividad>();
   }

  ngOnInit() {
    this.rutas = this.database.getRutas();
    this.cantidadCargaTransportar$.subscribe(cantidadCargaTransportar => {
      this.cantidadContenedores = cantidadCargaTransportar;
    })
  }

  totalKmChange(totalKm){
    this.totalKm = totalKm;
  }

  costoKmChange(costoKm){
    this.costoKm = costoKm;
  }

  rutasChange(rutas){
    this.rutas = rutas;
    this.database.saveRutas(this.rutas);
    this.calcular();
  }

  indicadoresFundamentalesChange(indicadores){
    this.indicadoresFundamentales = indicadores;
    this.database.saveIndicadoresFundamentales(indicadores);
    this.calcular();
  }

  otrosCostosChange(otrasActividades) {
    this.otrasActividades = otrasActividades;
    this.calcular();
  }

  calcular(){
    // console.log(this.rutas, this.indicadoresFundamentales, this.otrasActividades);
    // this.rutas.forEach(ruta => {
    //   const distancia = ruta.distancia;
    //   const indicadorCombustible = this.getIndicadorCombustible();
    // })
    this.store.dispatch(new CalcularActividadesResumenAction(true));
  }

  getIndicadorCombustible(){
    const indicador = this.indicadoresFundamentales.filter(r => r.descripcion = "Indicador de combustible");
    return indicador && indicador.length > 0 ? indicador[0].monto : 0;
  }

  cantidadCargaTransportarChange(){
    this.store.dispatch(new AddCantidadCargaTransportarAction(this.cantidadContenedores));
  }
}

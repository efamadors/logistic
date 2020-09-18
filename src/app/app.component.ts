import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddActividadApoyoAction, AddActividadesApoyoAction, AddActividadesFundamentalesAction, AddCantidadCargaTransportarAction, AddOtrasActividadesAction, AddRutasAction, CalcularActividadesResumenAction } from './ngxs/logistic.actions';
import { DatabaseService } from './services/database.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  constructor(private store: Store, private generalService: GeneralService, private databaseService: DatabaseService){
    this.getCantidadCargaTransportar();
    this.getRutas();
    this.getActividadesApoyo();
    this.getActividadesFundamentales();
    this.getOtrasActividades();

    this.store.dispatch(new CalcularActividadesResumenAction(true));
  }

  private getCantidadCargaTransportar() {
    let cantidadCargaTransportar = this.databaseService.getCantidadCargaTransportar();
    this.store.dispatch(new AddCantidadCargaTransportarAction(cantidadCargaTransportar));
  }

  private getRutas() {
    let rutas = this.databaseService.getRutas();
    if (!rutas || rutas.length == 0) {
      rutas = this.generalService.getDistribucionRutas();
    }
    this.store.dispatch(new AddRutasAction(rutas));
  }

  private getActividadesApoyo() {
    let actividades = this.databaseService.getActividadesApoyo();
    if (!actividades || actividades.length == 0) {
      actividades = this.generalService.getActividadesApoyo();
    }
    this.store.dispatch(new AddActividadesApoyoAction(actividades));
  }

  private getActividadesFundamentales() {
    let actividades = this.databaseService.getActividadesFundamentales();
    if (!actividades || actividades.length == 0) {
      actividades = this.generalService.getActividadesFundamentales();
    }
    this.store.dispatch(new AddActividadesFundamentalesAction(actividades));
  }

  private getOtrasActividades() {
    let actividades = this.databaseService.getOtrasActividades();
    if (!actividades || actividades.length == 0) {
      actividades = this.generalService.getOtrasActividades();
    }
    this.store.dispatch(new AddOtrasActividadesAction(actividades));
  }
}

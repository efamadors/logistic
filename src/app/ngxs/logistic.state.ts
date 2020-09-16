import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DatabaseService } from '../services/database.service';
import { Guid } from 'guid-typescript';
import { Ruta } from '../models/Ruta';
import { AddActividadApoyoAction, AddActividadesApoyoAction, AddCantidadCargaTransportarAction, AddRutaAction, AddRutasAction, DeleteRutaAction, UpdateActividadApoyoAction, UpdateRutaAction } from './logistic.actions';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividades';
import { GeneralService } from 'app/services/general.service';

export class LogisticStateModel {
  cantidadCargaTransportar: number;
  rutasMant: RutasResponse;
  actividadesMant: ActividadApoyoResponse;
}

export class RutasResponse {
  rutas: Ruta[];
  totalKm: number;
}

export class ActividadApoyoResponse {
  actividadesApoyo: Actividad[];
  totalCosteApoyo: number;
  costoxKm: number;
}

@State<LogisticStateModel>({
  name: 'logistic',
  defaults: {
    cantidadCargaTransportar: 0,
    rutasMant: new RutasResponse(),
    actividadesMant: new ActividadApoyoResponse()
  }
})
@Injectable()
export class LogisticState {

  constructor(private database: DatabaseService, private generalServicio: GeneralService) {
  }

  @Selector()
  static getCantidadCargaTransportar(state: LogisticStateModel) { return state.cantidadCargaTransportar; }

  @Selector()
  static getRutas(state: LogisticStateModel) { return state.rutasMant; }

  @Selector()
  static getActividadesApoyo(state: LogisticStateModel) { return state.actividadesMant; }

  @Action(AddCantidadCargaTransportarAction)
  addCantidadCargaTransportar({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddCantidadCargaTransportarAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      this.database.saveCantidadCargaTransportar(payload);

      setState({
        ...previousState,
        cantidadCargaTransportar:payload
      });
      resolve();
    })
  }


  @Action(AddRutasAction)
  addRutas({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddRutasAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      this.database.saveRutas(payload);
      const totalKm = this.generalServicio.getTotalKm(payload);

      setState({
        ...previousState,
        rutasMant: {
          rutas: payload,
          totalKm: totalKm
        }
      });
      resolve();
    })
  }

  @Action(AddRutaAction)
  addRuta({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddRutaAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const rutas = [...previousState.rutasMant.rutas];
      payload.id = Guid.create().toString();
      rutas.push(payload);

      this.database.saveRutas(rutas);
      const totalKm = this.generalServicio.getTotalKm(rutas);

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutas,
          totalKm: totalKm
        }
      });
      resolve();
    })
  }

  @Action(UpdateRutaAction)
  updateRuta({ getState, setState }: StateContext<LogisticStateModel>, { payload }: UpdateRutaAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const rutas = [...previousState.rutasMant.rutas];
      const rutaIndex = rutas.findIndex(r => r.id == payload.id);
      rutas[rutaIndex] = payload;
      const totalKm = this.generalServicio.getTotalKm(rutas);
      this.database.saveRutas(rutas);

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutas,
          totalKm: totalKm
        }
      });
      resolve();
    })
  }

  @Action(DeleteRutaAction)
  deleteRuta({ getState, setState }: StateContext<LogisticStateModel>, { payload }: DeleteRutaAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const rutas = [...previousState.rutasMant.rutas];
      const rutasFilter = rutas.filter(r => r.id != payload.id);
      this.database.saveRutas(rutasFilter);
      const totalKm = this.generalServicio.getTotalKm(rutas);

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutasFilter,
          totalKm: totalKm
        }
      });
      resolve();
    })
  }

  @Action(AddActividadesApoyoAction)
  addActividadesApoyo({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddActividadesApoyoAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      
      this.database.saveActividadesApoyo(payload);

      const totalCosteApoyo = this.generalServicio.getTotalCostoApoyo(payload);  
      const totalKm = previousState.rutasMant.totalKm;

      let costoxKm;
      if (totalKm > 0) costoxKm = totalCosteApoyo / totalKm;

      setState({
        ...previousState,
        actividadesMant: {
          actividadesApoyo: payload,
          costoxKm: costoxKm,
          totalCosteApoyo: totalCosteApoyo
        } 
      });
      resolve();
    })
  }

  @Action(AddActividadApoyoAction)
  addActividadApoyo({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddActividadApoyoAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesMant.actividadesApoyo];
      payload.id = Guid.create().toString();
      actividades.push(payload);

      this.database.saveActividadesApoyo(actividades);

      const totalCosteApoyo = this.generalServicio.getTotalCostoApoyo(actividades);  
      const totalKm = previousState.rutasMant.totalKm;

      let costoxKm;
      if (totalKm > 0) costoxKm = totalCosteApoyo / totalKm;

      setState({
        ...previousState,
        actividadesMant: {
          actividadesApoyo: actividades,
          costoxKm: costoxKm,
          totalCosteApoyo: totalCosteApoyo
        }
      });
      resolve();
    })
  }

  @Action(UpdateActividadApoyoAction)
  updateActividadApoyo({ getState, setState }: StateContext<LogisticStateModel>, { payload }: UpdateActividadApoyoAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesMant.actividadesApoyo];
      const actividadIndex = actividades.findIndex(r => r.id == payload.id);
      actividades[actividadIndex] = payload;

      this.database.saveActividadesApoyo(actividades);

      const totalCosteApoyo = this.generalServicio.getTotalCostoApoyo(actividades);  
      const totalKm = previousState.rutasMant.totalKm;

      let costoxKm;
      if (totalKm > 0) costoxKm = totalCosteApoyo / totalKm;

      setState({
        ...previousState,
        actividadesMant: {
          actividadesApoyo: actividades,
          costoxKm: costoxKm,
          totalCosteApoyo: totalCosteApoyo
        }
      });
      resolve();
    })
  }
}
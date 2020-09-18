import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DatabaseService } from '../services/database.service';
import { Guid } from 'guid-typescript';
import { Ruta } from '../models/Ruta';
import { AddActividadApoyoAction, AddActividadesApoyoAction, AddActividadesFundamentalesAction, AddActividadFundamentalAction, AddCantidadCargaTransportarAction, AddOtrasActividadesAction, AddRutaAction, AddRutasAction, CalcularActividadesResumenAction, DeleteActividadApoyoAction, DeleteActividadFundamentalAction, DeleteRutaAction, UpdateActividadApoyoAction, UpdateActividadesFundamentalesAction, UpdateOtraActividadAction, UpdateRutaAction } from './logistic.actions';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividades';
import { GeneralService } from 'app/services/general.service';

export class ActividadesResumenResponse {
  calculoActividadesRuta: Ruta[];
}

export class RutasResponse {
  rutas: Ruta[];
  totalKm: number;
  kmPorEquipo: number;
}

export class ActividadApoyoResponse {
  actividadesApoyo: Actividad[];
  totalCosteApoyo: number;
  costoxKm: number;
}

export class OtrasActividadesResponse {
  otrasActividades: Actividad[];
}

export class ActividadFundamentalResponse {
  actividadesFundamentales: Actividad[];
  indicadores: Actividad[];
}

export class LogisticStateModel {
  cantidadCargaTransportar: number;
  rutasMant: RutasResponse;
  actividadesMant: ActividadApoyoResponse;
  actividadesFundamentalesMant: ActividadFundamentalResponse;
  otrasActividadesMant: OtrasActividadesResponse;
  actividadesResumenMant: ActividadesResumenResponse;
}

@State<LogisticStateModel>({
  name: 'logistic',
  defaults: {
    cantidadCargaTransportar: 0,
    rutasMant: new RutasResponse(),
    actividadesMant: new ActividadApoyoResponse(),
    actividadesFundamentalesMant: new ActividadFundamentalResponse(),
    otrasActividadesMant: new OtrasActividadesResponse(),
    actividadesResumenMant: new ActividadesResumenResponse()
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

  @Selector()
  static getActividadesFundamentales(state: LogisticStateModel) { return state.actividadesFundamentalesMant; }

  @Selector()
  static getOtrasActividades(state: LogisticStateModel) { return state.otrasActividadesMant; }

  @Selector()
  static getActividadesResumen(state: LogisticStateModel) { return state.actividadesResumenMant; }

  @Action(AddCantidadCargaTransportarAction)
  addCantidadCargaTransportar({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddCantidadCargaTransportarAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      this.database.saveCantidadCargaTransportar(payload);

      setState({
        ...previousState,
        cantidadCargaTransportar: payload
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
      const kmPorEquipo = totalKm / previousState.cantidadCargaTransportar;

      setState({
        ...previousState,
        rutasMant: {
          rutas: payload,
          totalKm: totalKm,
          kmPorEquipo: kmPorEquipo
        }
      });
      resolve();
    })
  }

  @Action(AddOtrasActividadesAction)
  addOtrasActividades({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddOtrasActividadesAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      this.database.saveOtrasActividades(payload);

      setState({
        ...previousState,
        otrasActividadesMant: {
          otrasActividades: payload
        }
      });
      resolve();
    })
  }

  @Action(AddActividadesFundamentalesAction)
  addActividadesFundamentales({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddActividadesFundamentalesAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      this.database.saveActividadesFundamentales(payload);

      const indicadores = this.calcularIndicadoresActividadesFundamentales(payload, previousState.rutasMant.kmPorEquipo);

      setState({
        ...previousState,
        actividadesFundamentalesMant: {
          actividadesFundamentales: payload,
          indicadores: indicadores
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
      const kmPorEquipo = totalKm / previousState.cantidadCargaTransportar;

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutas,
          totalKm: totalKm,
          kmPorEquipo: kmPorEquipo
        }
      });
      resolve();
    })
  }

  @Action(AddActividadFundamentalAction)
  addActividadFundamental({ getState, setState }: StateContext<LogisticStateModel>, { payload }: AddActividadFundamentalAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesFundamentalesMant.actividadesFundamentales];
      payload.id = Guid.create().toString();
      actividades.push(payload);

      this.database.saveActividadesFundamentales(actividades);

      const indicadores = this.calcularIndicadoresActividadesFundamentales(actividades, previousState.rutasMant.kmPorEquipo);

      setState({
        ...previousState,
        actividadesFundamentalesMant: {
          actividadesFundamentales: actividades,
          indicadores: indicadores
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

      const kmPorEquipo = totalKm / previousState.cantidadCargaTransportar;

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutas,
          totalKm: totalKm,
          kmPorEquipo: kmPorEquipo
        }
      });
      resolve();
    })
  }

  @Action(UpdateOtraActividadAction)
  updateOtraActiviadad({ getState, setState }: StateContext<LogisticStateModel>, { payload }: UpdateOtraActividadAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.otrasActividadesMant.otrasActividades];
      const actividadesIndex = actividades.findIndex(r => r.id == payload.id);
      actividades[actividadesIndex] = payload;
      this.database.saveOtrasActividades(actividades);

      setState({
        ...previousState,
        otrasActividadesMant: {
          otrasActividades: actividades
        }
      });
      resolve();
    })
  }

  @Action(UpdateActividadesFundamentalesAction)
  updateActividadFundamental({ getState, setState }: StateContext<LogisticStateModel>, { payload }: UpdateActividadesFundamentalesAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesFundamentalesMant.actividadesFundamentales];
      const actividadIndex = actividades.findIndex(r => r.id == payload.id);
      actividades[actividadIndex] = payload;
      this.database.saveActividadesFundamentales(actividades);

      const indicadores = this.calcularIndicadoresActividadesFundamentales(actividades, previousState.rutasMant.kmPorEquipo);

      setState({
        ...previousState,
        actividadesFundamentalesMant: {
          actividadesFundamentales: actividades,
          indicadores: indicadores
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
      const kmPorEquipo = totalKm / previousState.cantidadCargaTransportar;

      setState({
        ...previousState,
        rutasMant: {
          rutas: rutasFilter,
          totalKm: totalKm,
          kmPorEquipo: kmPorEquipo
        }
      });
      resolve();
    })
  }

  @Action(DeleteActividadFundamentalAction)
  deleteActividadFundamental({ getState, setState }: StateContext<LogisticStateModel>, { payload }: DeleteActividadFundamentalAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesFundamentalesMant.actividadesFundamentales];
      const actividadFilter = actividades.filter(r => r.id != payload.id);
      this.database.saveActividadesFundamentales(actividadFilter);

      const indicadores = this.calcularIndicadoresActividadesFundamentales(actividadFilter, previousState.rutasMant.kmPorEquipo);

      setState({
        ...previousState,
        actividadesFundamentalesMant: {
          actividadesFundamentales: actividadFilter,
          indicadores: indicadores
        }
      });
      resolve();
    })
  }

  @Action(DeleteActividadApoyoAction)
  deleteActividadApoyo({ getState, setState }: StateContext<LogisticStateModel>, { payload }: DeleteActividadApoyoAction) {
    return new Promise((resolve) => {
      const previousState = getState();
      const actividades = [...previousState.actividadesMant.actividadesApoyo];
      const actividadFilter = actividades.filter(r => r.id != payload.id);
      this.database.saveActividadesApoyo(actividadFilter);

      const totalCosteApoyo = this.generalServicio.getTotalCostoApoyo(actividadFilter);
      const totalKm = previousState.rutasMant.totalKm;

      let costoxKm;
      if (totalKm > 0) costoxKm = totalCosteApoyo / totalKm;

      setState({
        ...previousState,
        actividadesMant: {
          actividadesApoyo: actividadFilter,
          costoxKm: costoxKm,
          totalCosteApoyo: totalCosteApoyo
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

  @Action(CalcularActividadesResumenAction)
  getActividadesResumen({ getState, setState }: StateContext<LogisticStateModel>, { payload }: CalcularActividadesResumenAction) {
    return new Promise((resolve) => {
      const previousState = getState();

      const rutas = previousState.rutasMant.rutas;
      const indicadores = previousState.actividadesFundamentalesMant.indicadores;
      const otrasActividades = previousState.otrasActividadesMant.otrasActividades;
      const costoxKm = previousState.actividadesMant.costoxKm;
      
      const calculoActividades = this.generalServicio.calcularResumenActividadesFundamentales(rutas, indicadores, otrasActividades, costoxKm);

      setState({
        ...previousState,
        actividadesResumenMant: {
          calculoActividadesRuta: calculoActividades
        }
      });
      resolve();
    })
  }

  private calcularIndicadoresActividadesFundamentales(actividades: Actividad[], kmPorEquipo: number) {
    const indicadores = new Array<Actividad>();
    const indicadorCombustible = this.generalServicio.getIndicadorCombustible(actividades);
    const indicador = new Actividad();
    indicador.id = Guid.create().toString();
    indicador.descripcion = "Indicador de combustible";
    indicador.monto = indicadorCombustible;
    indicadores.push(indicador);

    const otrosIndicadores = this.generalServicio.getOtrosIndicadorFundamentales(actividades, kmPorEquipo);
    otrosIndicadores.forEach(item => indicadores.push(item));

    return indicadores;
  }
}
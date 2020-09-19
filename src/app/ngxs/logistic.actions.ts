import { Empresa } from 'app/models/Empresa';
import { Actividad } from '../models/Actividades';
import { Ruta } from '../models/Ruta';

export class AddOrUpdateEmpresaAction {
  static readonly type = '[EMPRESA] AddOrUpdate';
  constructor(public payload: Empresa) { }
}

export class AddCantidadCargaTransportarAction {
  static readonly type = '[CANTIDAD CARGA TRANSPORTAR] Add';
  constructor(public payload: number) { }
}

export class CalcularActividadesResumenAction {
  static readonly type = '[RESUMEN] Calcular';
  constructor(public payload: boolean) { }
}

export class AddRutasAction {
  static readonly type = '[RUTAS] Add Range';
  constructor(public payload: Ruta[]) { }
}

export class AddOtrasActividadesAction {
  static readonly type = '[OTRAS ACTIVIDADES] Add Range';
  constructor(public payload: Actividad[]) { }
}

export class AddActividadesFundamentalesAction {
  static readonly type = '[ACTIVIDADES FUNDAMENTALES] Add Range';
  constructor(public payload: Actividad[]) { }
}

export class AddActividadFundamentalAction {
  static readonly type = '[ACTIVIDADES FUNDAMENTALES] Add';
  constructor(public payload: Actividad) { }
}

export class DeleteActividadFundamentalAction {
  static readonly type = '[ACTIVIDADES FUNDAMENTALES] Delete';
  constructor(public payload: Actividad) { }
}


export class UpdateActividadesFundamentalesAction {
  static readonly type = '[ACTIVIDADES FUNDAMENTALES] Update';
  constructor(public payload: Actividad) { }
}

export class UpdateRutaAction {
  static readonly type = '[RUTAS] Update';
  constructor(public payload: Ruta) { }
}

export class UpdateOtraActividadAction {
  static readonly type = '[OTRAS ACTIVIDADES] Update';
  constructor(public payload: Actividad) { }
}

export class AddRutaAction {
  static readonly type = '[RUTAS] Add';
  constructor(public payload: Ruta) { }
}

export class DeleteRutaAction {
  static readonly type = '[RUTAS] Delete';
  constructor(public payload: Ruta) { }
}

export class AddActividadesApoyoAction {
  static readonly type = '[ACTIVIDADES APOYO] Add Range';
  constructor(public payload: Actividad[]) { }
}

export class AddActividadApoyoAction {
  static readonly type = '[ACTIVIDADES APOYO] Add';
  constructor(public payload: Actividad) { }
}

export class DeleteActividadApoyoAction {
  static readonly type = '[ACTIVIDADES APOYO] Delete';
  constructor(public payload: Actividad) { }
}

export class UpdateActividadApoyoAction {
  static readonly type = '[ACTIVIDADES APOYO] Update';
  constructor(public payload: Actividad) { }
}
import { Actividad } from '../models/Actividades';
import { Ruta } from '../models/Ruta';

export class AddCantidadCargaTransportarAction {
  static readonly type = '[CANTIDAD CARGA TRANSPORTAR] Add';
  constructor(public payload: number) { }
}

export class AddRutasAction {
  static readonly type = '[RUTAS] Add Range';
  constructor(public payload: Ruta[]) { }
}

export class UpdateRutaAction {
  static readonly type = '[RUTAS] Update';
  constructor(public payload: Ruta) { }
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

export class UpdateActividadApoyoAction {
  static readonly type = '[ACTIVIDADES APOYO] Update';
  constructor(public payload: Actividad) { }
}
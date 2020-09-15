import { Ruta } from '../models/Ruta';

export class GetRutasAction {
    static readonly type = '[RUTAS] GetAll';
    constructor(public payload: Ruta[]) {}
  }
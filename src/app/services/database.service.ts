import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividades';
import { Ruta } from '../models/Ruta';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  saveCantidadCargaTransportar(cantidadCargaTransportar: number){
    localStorage.setItem('cantidadCargaTransportar', cantidadCargaTransportar.toString());
  }

  saveRutas(rutas: Ruta[]) {
    localStorage.setItem('rutas', JSON.stringify(rutas));
  }

  saveActividadesApoyo(actividades: Actividad[]) {
    localStorage.setItem('actividadesApoyo', JSON.stringify(actividades));
  }

  saveActividadesFundamentales(actividades: Actividad[]) {
    localStorage.setItem('actividades', JSON.stringify(actividades));
  }

  saveIndicadoresFundamentales(actividades: Actividad[]) {
    localStorage.setItem('indicadoresFundamentales', JSON.stringify(actividades));
  }

  getCantidadCargaTransportar() : number{
    const cantidadCargaTransportar = localStorage.getItem('cantidadCargaTransportar');
    return Number(cantidadCargaTransportar ? cantidadCargaTransportar : 0);
  }

  getRutas(): Ruta[] {
    const rutasString = localStorage.getItem('rutas');
    return rutasString ? JSON.parse(rutasString).map((item)=>{
      const ruta = new Ruta();
      ruta.origen = item.origen;
      ruta.destino = item.destino;
      ruta.distancia = item.distancia;
      ruta.cantidadViajes = item.cantidadViajes;
      ruta.calcularRecorrido();
      return ruta;
    }) : [];
  }

  getActividadesApoyo(): Actividad[] {
    const rutasString = localStorage.getItem('actividadesApoyo');
    return JSON.parse(rutasString);
  }

  getActividadesFundamentales(): Actividad[] {
    const rutasString = localStorage.getItem('actividades');
    return JSON.parse(rutasString);
  }

  getIndicadoresFundamentales(): Actividad[] {
    const rutasString = localStorage.getItem('indicadoresFundamentales');
    return JSON.parse(rutasString);
  }
}

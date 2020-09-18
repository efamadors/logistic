import { Injectable } from '@angular/core';
import { Empresa } from 'app/models/Empresa';
import { Actividad } from '../models/Actividades';
import { Ruta } from '../models/Ruta';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  setEmpresa(empresa: Empresa){
    localStorage.setItem('empresa', JSON.stringify(empresa));
  }

  saveCantidadCargaTransportar(cantidadCargaTransportar: number){
    localStorage.setItem('cantidadCargaTransportar', cantidadCargaTransportar.toString());
  }

  saveRutas(rutas: Ruta[]) {
    localStorage.removeItem('rutas');
    localStorage.setItem('rutas', JSON.stringify(rutas));
  }

  saveActividadesApoyo(actividades: Actividad[]) {
    localStorage.setItem('actividadesApoyo', JSON.stringify(actividades));
  }

  saveActividadesFundamentales(actividades: Actividad[]) {
    localStorage.setItem('actividadesFundamentales', JSON.stringify(actividades));
  }

  saveIndicadoresFundamentales(actividades: Actividad[]) {
    localStorage.setItem('indicadoresFundamentales', JSON.stringify(actividades));
  }

  saveOtrasActividades(actividades: Actividad[]) {
    localStorage.setItem('otrasActividades', JSON.stringify(actividades));
  }

  getEmpresa(){
    const string = localStorage.getItem('empresa');
    return JSON.parse(string);
  }

  getCantidadCargaTransportar() : number{
    const cantidadCargaTransportar = localStorage.getItem('cantidadCargaTransportar');
    return Number(cantidadCargaTransportar ? cantidadCargaTransportar : 0);
  }

  getOtrasActividades(): Actividad[] {
    const string = localStorage.getItem('otrasActividades');
    return JSON.parse(string);
  }

  getRutas(): Ruta[] {
    const rutasString = localStorage.getItem('rutas');
    return rutasString ? JSON.parse(rutasString).map((item)=>{
      const ruta = new Ruta();
      ruta.id = item.id;
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
    const rutasString = localStorage.getItem('actividadesFundamentales');
    return JSON.parse(rutasString);
  }

  getIndicadoresFundamentales(): Actividad[] {
    const rutasString = localStorage.getItem('indicadoresFundamentales');
    return JSON.parse(rutasString);
  }
}

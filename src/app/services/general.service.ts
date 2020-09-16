import { Injectable } from '@angular/core';
import { CubicajeGeneral } from '../models/CubicajeGeneral';
import { CubicajeResult } from '../models/CubicajeResult';
import { TipoVehiculoCargaTerrestre } from '../models/TipoVehiculoCargaTerrestre';
import { CubicajeRecipiente } from '../models/CubicajeRecipiente';
import { CubicajeGranel } from '../models/CubicajeGranel';
import { Ruta } from '../models/Ruta';
import { Actividad } from '../models/Actividades';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
 
  anchoDefault: number = 8.5;
  altoDefault: number = 8;
  
  constructor() { }

  getIndicadoresOtros(actividades: Actividad[], kmPorEquipo: number) {
    let returnoActividades = new Array<Actividad>();
    const otrasActividades = actividades.filter(item => item.monto > 0 && item.descripcion != "Precio de combustible" && item.descripcion != "Consumo de combustible");
    for (const iterator of otrasActividades) {
      const act = new Actividad();
      act.descripcion = iterator.descripcion;
      act.monto = iterator.monto / kmPorEquipo;
      returnoActividades.push(act);
    }
    return returnoActividades;
  }

  getIndicadorCombustible(actividades: Actividad[]) {
    const precio = actividades.filter(item => item.monto > 0 && item.descripcion == "Precio de combustible").reduce((sum, current) => sum + current.monto, 0);
    const consumo = actividades.filter(item => item.monto > 0 && item.descripcion == "Consumo de combustible").reduce((sum, current) => sum + current.monto, 0);
    return precio / consumo;
  }

  getTotalCostoApoyo(actividades: Actividad[]): number {
    const sum = actividades.filter(item => item.monto > 0).reduce((sum, current) => sum + current.monto, 0);
    return sum;
  }
  
  getTotalKm(rutas: Ruta[]): number{
    const sum = rutas.filter(item => item.recorrido > 0).reduce((sum, current) => sum + current.recorrido, 0);
    return sum;
  }

  getOtrasActividades(): Actividad[] {
    let actividades = new Array<Actividad>();
    actividades.push(this.crearActividad("Comisiones"));
    actividades.push(this.crearActividad("Viaticos"));
    actividades.push(this.crearActividad("13vo"));
    actividades.push(this.crearActividad("14vo"));    
    actividades.push(this.crearActividad("Vacaciones"));    
    return actividades;
  }

  getActividadesFundamentales(): Actividad[] {
    let actividades = new Array<Actividad>();
    actividades.push(this.crearActividad("Precio de combustible"));
    actividades.push(this.crearActividad("Consumo de combustible"));
    actividades.push(this.crearActividad("Mantenimiento de Equipo"));
    actividades.push(this.crearActividad("Sueldo base de cada motorista"));    
    return actividades;
  }

  getActividadesApoyo(): Actividad[] {
    let actividades = new Array<Actividad>();
    actividades.push(this.crearActividad("Gerente Administrativo"));
    actividades.push(this.crearActividad("Encargado de Almacén"));
    actividades.push(this.crearActividad("Jefe de Operaciones"));
    actividades.push(this.crearActividad("Fuerza de ventas"));    
    actividades.push(this.crearActividad("Personal de operaciones"));
    actividades.push(this.crearActividad("Servicios Públicos"));
    actividades.push(this.crearActividad("Servicios Tecnológicos y de Comunicación"));
    actividades.push(this.crearActividad("Depreciación de mobiliario"));
    actividades.push(this.crearActividad("Otros gastos administrativos"));
    actividades.push(this.crearActividad("Depreciacion de camiones"));
    return actividades;
  }

  private crearActividad(descripcion: string) : Actividad{
    const act = new Actividad();
    act.descripcion = descripcion;
    act.id = Guid.create().toString();
    return act;
  }

  getDistribucionRutas(): Ruta[] {
    let rutas = new Array<Ruta>();

    let ruta1 = new Ruta();
    ruta1.id = Guid.create().toString();
    ruta1.origen = "San Pedro Sula";
    ruta1.destino = "Tegucigalpa";
    ruta1.distancia = 256;
    ruta1.cantidadViajes = 0;
    ruta1.recorrido = 0;
    
    let ruta2 = new Ruta();
    ruta2.id = Guid.create().toString();
    ruta2.origen = "San Pedro Sula";
    ruta2.destino = "San Lorenzo";
    ruta2.distancia = 362;
    ruta2.cantidadViajes = 0;
    ruta2.recorrido = 0;

    let ruta3 = new Ruta();
    ruta3.id = Guid.create().toString();
    ruta3.origen = "San Pedro Sula";
    ruta3.destino = "Siguatepeque";
    ruta3.distancia = 125;
    ruta3.cantidadViajes = 0;
    ruta3.recorrido = 0;

    let ruta4 = new Ruta();
    ruta4.id = Guid.create().toString();
    ruta4.origen = "San Pedro Sula";
    ruta4.destino = "Santa Rosa de Copan";
    ruta4.distancia = 156;
    ruta4.cantidadViajes = 0;
    ruta4.recorrido = 0;

    let ruta5 = new Ruta();
    ruta5.id = Guid.create().toString();
    ruta5.origen = "San Pedro Sula";
    ruta5.destino = "La Ceiba";
    ruta5.distancia = 190;
    ruta5.cantidadViajes = 0;
    ruta5.recorrido = 0;

    rutas.push(ruta1);
    rutas.push(ruta2);
    rutas.push(ruta3);
    rutas.push(ruta4);
    rutas.push(ruta5);
    return rutas;
  }
  
  calculateCubicajeGranel(cubicajeGranel: CubicajeGranel): CubicajeResult {
    let result = new CubicajeResult();
    let densidadLiquido = cubicajeGranel.densidadLiquido * 3.78541;
    
    const cantidadLiquidoCisterna = cubicajeGranel.tipoVehiculoCargaTerrestre.peso / densidadLiquido;
    const cantidadCisternasPeso = Math.ceil(cubicajeGranel.cantidadTransportar / cantidadLiquidoCisterna);

    const cantidadCisternasVolumen = Math.ceil(cubicajeGranel.cantidadTransportar / cubicajeGranel.capacidadCisterna);

    result.cantidadCisternas = Math.min(cantidadCisternasPeso, cantidadCisternasVolumen);
    
    return result;
  }


  calculateCubicajeRecipientes(cubicajeRecipiente: CubicajeRecipiente): CubicajeResult {
    let result = new CubicajeResult();
    let densidadLiquido = cubicajeRecipiente.densidadLiquido * 3.78541;
    const largo = Math.floor(cubicajeRecipiente.largoContenedor / cubicajeRecipiente.dimensionRecipiente.largo);
    const ancho = Math.floor(this.anchoDefault / cubicajeRecipiente.dimensionRecipiente.ancho);
    const alto = Math.floor(this.altoDefault / cubicajeRecipiente.dimensionRecipiente.alto);

    const cantidadRecipientesxContenedorVolumen = Math.floor(largo*ancho*alto);
    
    const pesoRecipientes = densidadLiquido * cubicajeRecipiente.dimensionRecipiente.capacidad;
    const cantidadRecipientexContenedorPeso = Math.floor(cubicajeRecipiente.tipoVehiculoCargaTerrestre.peso / pesoRecipientes);

    result.cantidadPorContenedor = Math.min(cantidadRecipientesxContenedorVolumen, cantidadRecipientexContenedorPeso);
    result.cantidadGalonesPorContenedor = result.cantidadPorContenedor * cubicajeRecipiente.dimensionRecipiente.capacidad;
    result.cantidadContenedoresNecesarios = Math.ceil(cubicajeRecipiente.cantidadTransportar / result.cantidadGalonesPorContenedor);
    
    return result;
  }

  calculateCubicajeGeneral(cubicajeGeneral: CubicajeGeneral): CubicajeResult { 

    let result = new CubicajeResult();
    const largo = Math.floor(cubicajeGeneral.largoContenedor / cubicajeGeneral.dimensionCaja.largo);
    const ancho = Math.floor(this.anchoDefault / cubicajeGeneral.dimensionCaja.ancho);
    const alto = Math.floor(this.altoDefault / cubicajeGeneral.dimensionCaja.alto);

    const cantidadCajasxContenedorVolumen = Math.floor(largo*ancho*alto);
    const cantidadContenedoresNecesariosVolumen = Math.ceil(cubicajeGeneral.cantidadTransportar / cantidadCajasxContenedorVolumen);

    const cantidadCajasxContenedorPeso = Math.floor(cubicajeGeneral.tipoVehiculoCargaTerrestre.peso / cubicajeGeneral.dimensionCaja.capacidad);
    const cantidadContenedoresNecesariosPeso = Math.ceil(cubicajeGeneral.tipoVehiculoCargaTerrestre.peso / cantidadCajasxContenedorPeso);

    result.cantidadPorContenedor = Math.min(cantidadCajasxContenedorVolumen, cantidadCajasxContenedorPeso);
    result.cantidadContenedoresNecesarios = Math.min(cantidadContenedoresNecesariosVolumen, cantidadContenedoresNecesariosPeso);
    
    return result;
  }

  getTiposVehiculosCargaTerrestre() : TipoVehiculoCargaTerrestre[] {
    let tiposVehiculoCargaTerrestres = new Array<TipoVehiculoCargaTerrestre>();

    const tipoVehiculoCargaTerrestre1 = new TipoVehiculoCargaTerrestre();
    tipoVehiculoCargaTerrestre1.tipo = "T3-S2";
    tipoVehiculoCargaTerrestre1.peso = 22000;

    const tipoVehiculoCargaTerrestre2 = new TipoVehiculoCargaTerrestre();
    tipoVehiculoCargaTerrestre2.tipo = "T3-S3";
    tipoVehiculoCargaTerrestre2.peso = 23000;

    const tipoVehiculoCargaTerrestre3 = new TipoVehiculoCargaTerrestre();
    tipoVehiculoCargaTerrestre3.tipo = "Otro Modelo";
    tipoVehiculoCargaTerrestre3.peso = 0;

    tiposVehiculoCargaTerrestres.push(tipoVehiculoCargaTerrestre1);
    tiposVehiculoCargaTerrestres.push(tipoVehiculoCargaTerrestre2);
    tiposVehiculoCargaTerrestres.push(tipoVehiculoCargaTerrestre3);
    return tiposVehiculoCargaTerrestres;
  }
}

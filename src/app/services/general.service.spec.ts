import { TestBed } from '@angular/core/testing';

import { GeneralService } from './general.service';
import { CubicajeGeneral } from '../models/CubicajeGeneral';
import { TipoVehiculoCargaTerrestre } from 'app/models/TipoVehiculoCargaTerrestre';
import { DimensionObjeto } from 'app/models/DimensionObjeto';
import { CubicajeRecipiente } from 'app/models/CubicajeRecipiente';
import { CubicajeGranel } from 'app/models/CubicajeGranel';

describe('GeneralService', () => {
  let service: GeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be result for CubicajeGeneral', () => {
    let cubicajeGeneral = new CubicajeGeneral();
    cubicajeGeneral.cantidadTransportar = 15000;
    cubicajeGeneral.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
    cubicajeGeneral.tipoVehiculoCargaTerrestre.peso = 22000;
    cubicajeGeneral.largoContenedor = 40;

    cubicajeGeneral.dimensionCaja = new DimensionObjeto();
    cubicajeGeneral.dimensionCaja.largo = 1.5;
    cubicajeGeneral.dimensionCaja.ancho = 2;
    cubicajeGeneral.dimensionCaja.alto = 2;
    cubicajeGeneral.dimensionCaja.capacidad = 45.45;

    const result = service.calculateCubicajeGeneral(cubicajeGeneral);

    expect(result.cantidadPorContenedor).toBe(416);
    expect(result.cantidadContenedoresNecesarios).toBe(37);
  })

  it('should be result for CubicajeRecipiente', () => {
    let cubicajeRecipiente = new CubicajeRecipiente();
    cubicajeRecipiente.densidadLiquido = 0.789;
    cubicajeRecipiente.cantidadTransportar = 60000;
    cubicajeRecipiente.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
    cubicajeRecipiente.tipoVehiculoCargaTerrestre.peso = 22000;
    cubicajeRecipiente.largoContenedor = 40;

    cubicajeRecipiente.dimensionRecipiente = new DimensionObjeto();
    cubicajeRecipiente.dimensionRecipiente.largo = 2;
    cubicajeRecipiente.dimensionRecipiente.ancho = 2;
    cubicajeRecipiente.dimensionRecipiente.alto = 3.5;
    cubicajeRecipiente.dimensionRecipiente.capacidad = 50;

    const result = service.calculateCubicajeRecipientes(cubicajeRecipiente);

    expect(result.cantidadPorContenedor).toBe(147);
    expect(result.cantidadGalonesPorContenedor).toBe(7350);
    expect(result.cantidadContenedoresNecesarios).toBe(9);
  })

  it('should be result for CubicajeGranel', () => {
    let cubicajeGranel = new CubicajeGranel();
    cubicajeGranel.densidadLiquido = 0.789;
    cubicajeGranel.cantidadTransportar = 60000;
    cubicajeGranel.capacidadCisterna = 7000;
    cubicajeGranel.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
    cubicajeGranel.tipoVehiculoCargaTerrestre.peso = 22000;
    
    const result = service.calculateCubicajeGranel(cubicajeGranel);

    expect(result.cantidadCisternas).toBe(9);
  })
});

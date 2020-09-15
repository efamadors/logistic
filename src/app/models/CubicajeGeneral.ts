import { TipoVehiculoCargaTerrestre } from './TipoVehiculoCargaTerrestre';
import { DimensionObjeto } from './DimensionObjeto';

export class CubicajeGeneral{
    public tipoMercancia: string;
    public cantidadTransportar: number;
    public tipoVehiculoCargaTerrestre: TipoVehiculoCargaTerrestre;
    public largoContenedor: number;
    public dimensionCaja: DimensionObjeto;

    constructor(){
        this.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
        this.dimensionCaja = new DimensionObjeto();
    }
}
import { TipoVehiculoCargaTerrestre } from './TipoVehiculoCargaTerrestre';
import { DimensionObjeto } from './DimensionObjeto';

export class CubicajeRecipiente{
    public nombreLiquido: string;
    public densidadLiquido: number;
    public cantidadTransportar: number;
    public dimensionRecipiente: DimensionObjeto;
    public tipoVehiculoCargaTerrestre: TipoVehiculoCargaTerrestre;
    public largoContenedor: number;

    constructor(){
        this.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
        this.dimensionRecipiente = new DimensionObjeto();
    }
}
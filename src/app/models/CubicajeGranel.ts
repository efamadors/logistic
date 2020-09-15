import { TipoVehiculoCargaTerrestre } from './TipoVehiculoCargaTerrestre';

export class CubicajeGranel {
    public nombreLiquido: string;
    public densidadLiquido: number;
    public cantidadTransportar: number;
    public capacidadCisterna: number;
    public tipoVehiculoCargaTerrestre: TipoVehiculoCargaTerrestre;

    constructor(){
        this.tipoVehiculoCargaTerrestre = new TipoVehiculoCargaTerrestre();
    }
}
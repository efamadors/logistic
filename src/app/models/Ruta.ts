import { Guid } from 'guid-typescript';

export class Ruta {
    public id: string;
    public origen: string;
    public destino: string;
    public distancia: number;
    public cantidadViajes: number;
    public recorrido: number;
    public costoxKmActFundamental: number;
    public costoxKmActApoyo: number;
    public costoxKmTotal: number;
    
    calcularRecorrido(){
        this.recorrido = this.distancia * this.cantidadViajes * 2;
    }
}
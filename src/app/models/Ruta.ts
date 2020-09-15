export class Ruta {
    public origen: string;
    public destino: string;
    public distancia: number;
    public cantidadViajes: number;
    public recorrido: number;

    calcularRecorrido(){
        this.recorrido = this.distancia * this.cantidadViajes * 2;
    }
}
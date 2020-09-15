import { Component } from "@angular/core";
import { CubicajeGeneral } from 'app/models/CubicajeGeneral';

@Component({
    selector: 'app-registro',
    moduleId: module.id,
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
    cubicajeGeneral : CubicajeGeneral;
    tipoCubicajeSeleccionado: string;

    constructor(){
        this.cubicajeGeneral = new CubicajeGeneral();
    }
};
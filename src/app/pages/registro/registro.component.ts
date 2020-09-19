import { Component } from "@angular/core";
import { Store } from '@ngxs/store';
import { CubicajeGeneral } from 'app/models/CubicajeGeneral';
import { Empresa } from 'app/models/Empresa';
import { AddOrUpdateEmpresaAction } from 'app/ngxs/logistic.actions';

@Component({
    selector: 'app-registro',
    moduleId: module.id,
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
    cubicajeGeneral : CubicajeGeneral;
    tipoCubicajeSeleccionado: string;
    nombreEmpresa: string;

    constructor(private store: Store){
        this.cubicajeGeneral = new CubicajeGeneral();
    }

    tipoCubicajeSeleccionadoEvento() {
        this.addOrUpdateEmpresa();
    }

    nombreEmpresaChange(){
        this.addOrUpdateEmpresa();
    }

     addOrUpdateEmpresa(){
        const empresa = new Empresa();
        empresa.nombre = this.nombreEmpresa;
        empresa.tipoCubicaje = this.tipoCubicajeSeleccionado;
        this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
    }
};
import { Component, Input } from "@angular/core";
import { CubicajeGeneral } from '../../../models/CubicajeGeneral';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { GeneralService } from '../../../services/general.service';
import { CubicajeResult } from 'app/models/CubicajeResult';

@Component({
    selector: 'app-cubicaje-general',
    templateUrl: './cubicaje-general.component.html',
    styleUrls: ['./cubicaje-general.component.scss']
})
export class CubicajeGeneralComponent {
    cubicajeGeneral : CubicajeGeneral;
    tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
    cubicajeResult: CubicajeResult;

    constructor(private generalService: GeneralService){
        this.cubicajeGeneral = new CubicajeGeneral();
        this.cubicajeResult = new CubicajeResult();
        
        this.setTiposVehiculosCargaTerrestre();
    }

    calcular(){
        this.cubicajeResult = this.generalService.calculateCubicajeGeneral(this.cubicajeGeneral);
    }

    tipoVehiculoCargaTerrestreChange(event){
        const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
        if (tipo) {
            this.cubicajeGeneral.tipoVehiculoCargaTerrestre = tipo[0];
        }
    }

    private setTiposVehiculosCargaTerrestre() {
        this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
    }
}
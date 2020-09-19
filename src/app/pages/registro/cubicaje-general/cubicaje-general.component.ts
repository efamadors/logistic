import { Component, Input, OnInit } from "@angular/core";
import { CubicajeGeneral } from '../../../models/CubicajeGeneral';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { GeneralService } from '../../../services/general.service';
import { CubicajeResult } from 'app/models/CubicajeResult';
import { Select, Store } from '@ngxs/store';
import { AddOrUpdateEmpresaAction } from 'app/ngxs/logistic.actions';
import { Empresa } from 'app/models/Empresa';
import { EmpresaResponse, LogisticState } from 'app/ngxs/logistic.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cubicaje-general',
    templateUrl: './cubicaje-general.component.html',
    styleUrls: ['./cubicaje-general.component.scss']
})
export class CubicajeGeneralComponent implements OnInit{
    cubicajeGeneral : CubicajeGeneral;
    tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
    cubicajeResult: CubicajeResult;
    @Select(LogisticState.getEmpresa) empresaMant$: Observable<EmpresaResponse>;

    constructor(private generalService: GeneralService, private store: Store){
        this.cubicajeGeneral = new CubicajeGeneral();
        this.cubicajeResult = new CubicajeResult();
        this.setTiposVehiculosCargaTerrestre();
    }

    ngOnInit(){
    }

    calcular(){
        this.cubicajeResult = this.generalService.calculateCubicajeGeneral(this.cubicajeGeneral);
        const empresa = new Empresa();
        empresa.cantidadCajasContenedor =  this.cubicajeResult.cantidadPorContenedor;
        empresa.cantidadContenedoresNecesarios =  this.cubicajeResult.cantidadContenedoresNecesarios;
        this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
    }

    tipoVehiculoCargaTerrestreChange(event){
        const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
        if (tipo) {
            this.cubicajeGeneral.tipoVehiculoCargaTerrestre = tipo[0];
            const empresa = new Empresa();
            empresa.tipoVehiculo = this.cubicajeGeneral.tipoVehiculoCargaTerrestre.tipo;
            this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
        }
    }

    tipoMercaderiaChange(){
        const empresa = new Empresa();
        empresa.tipoMercancia = this.cubicajeGeneral.tipoMercancia;
        this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
    }

    private setTiposVehiculosCargaTerrestre() {
        this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
    }
}
import { Component, OnInit } from '@angular/core';
import { CubicajeGranel } from '../../../models/CubicajeGranel';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { CubicajeResult } from '../../../models/CubicajeResult';
import { GeneralService } from '../../../services/general.service';
import { Empresa } from 'app/models/Empresa';
import { AddOrUpdateEmpresaAction } from 'app/ngxs/logistic.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cubicaje-granel',
  templateUrl: './cubicaje-granel.component.html',
  styleUrls: ['./cubicaje-granel.component.css']
})
export class CubicajeGranelComponent {
  cubicajeGranel: CubicajeGranel;
  tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
  cubicajeResult: CubicajeResult;

  constructor(private generalService: GeneralService, private store: Store) {
    this.cubicajeGranel = new CubicajeGranel();
    this.cubicajeResult = new CubicajeResult();

    this.setTiposVehiculosCargaTerrestre();
  }

  calcular() {
    this.cubicajeResult = this.generalService.calculateCubicajeGranel(this.cubicajeGranel);
    const empresa = new Empresa();
    empresa.cantidadCajasContenedor =  this.cubicajeResult.cantidadPorContenedor;
    empresa.cantidadContenedoresNecesarios =  this.cubicajeResult.cantidadContenedoresNecesarios;
    empresa.cantidadCisternas =  this.cubicajeResult.cantidadCisternas;
    this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
  }

  nombreLiquidoChange(){
    const empresa = new Empresa();
    empresa.tipoMercancia = this.cubicajeGranel.nombreLiquido;
    this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
  }

  tipoVehiculoCargaTerrestreChange(event) {
    const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
    if (tipo) {
      this.cubicajeGranel.tipoVehiculoCargaTerrestre = tipo[0];
      const empresa = new Empresa();
      empresa.tipoVehiculo = this.cubicajeGranel.tipoVehiculoCargaTerrestre.tipo;
      this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
    }
  }

  private setTiposVehiculosCargaTerrestre() {
    this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
  }
}

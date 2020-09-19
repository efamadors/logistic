import { Component, OnInit } from '@angular/core';
import { CubicajeRecipiente } from '../../../models/CubicajeRecipiente';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { CubicajeResult } from '../../../models/CubicajeResult';
import { GeneralService } from '../../../services/general.service';
import { Store } from '@ngxs/store';
import { Empresa } from 'app/models/Empresa';
import { AddOrUpdateEmpresaAction } from 'app/ngxs/logistic.actions';

@Component({
  selector: 'app-cubicaje-recipientes',
  templateUrl: './cubicaje-recipientes.component.html',
  styleUrls: ['./cubicaje-recipientes.component.scss']
})
export class CubicajeRecipientesComponent{
  cubicajeRecipiente : CubicajeRecipiente;
  tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
  cubicajeResult: CubicajeResult;

  constructor(private generalService: GeneralService, private store: Store){
    this.cubicajeRecipiente = new CubicajeRecipiente();
    this.cubicajeResult = new CubicajeResult();
    
    this.setTiposVehiculosCargaTerrestre();
  }

  calcular(){
    this.cubicajeResult = this.generalService.calculateCubicajeRecipientes(this.cubicajeRecipiente);
    const empresa = new Empresa();
    empresa.cantidadCajasContenedor =  this.cubicajeResult.cantidadPorContenedor;
    empresa.cantidadContenedoresNecesarios =  this.cubicajeResult.cantidadContenedoresNecesarios;
    this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
  }

  tipoVehiculoCargaTerrestreChange(event){
      const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
      if (tipo) {
          this.cubicajeRecipiente.tipoVehiculoCargaTerrestre = tipo[0];
          const empresa = new Empresa();
          empresa.tipoVehiculo = this.cubicajeRecipiente.tipoVehiculoCargaTerrestre.tipo;
          this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
      }
  }

  nombreLiquidoChange(){
    const empresa = new Empresa();
        empresa.tipoMercancia = this.cubicajeRecipiente.nombreLiquido;
        this.store.dispatch(new AddOrUpdateEmpresaAction(empresa));
  }

  private setTiposVehiculosCargaTerrestre(){
    this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
  }
}

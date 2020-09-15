import { Component, OnInit } from '@angular/core';
import { CubicajeRecipiente } from '../../../models/CubicajeRecipiente';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { CubicajeResult } from '../../../models/CubicajeResult';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-cubicaje-recipientes',
  templateUrl: './cubicaje-recipientes.component.html',
  styleUrls: ['./cubicaje-recipientes.component.scss']
})
export class CubicajeRecipientesComponent{
  cubicajeRecipiente : CubicajeRecipiente;
  tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
  cubicajeResult: CubicajeResult;

  constructor(private generalService: GeneralService){
    this.cubicajeRecipiente = new CubicajeRecipiente();
    this.cubicajeResult = new CubicajeResult();
    
    this.setTiposVehiculosCargaTerrestre();
  }

  calcular(){
    this.cubicajeResult = this.generalService.calculateCubicajeRecipientes(this.cubicajeRecipiente);
  }

  tipoVehiculoCargaTerrestreChange(event){
      const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
      if (tipo) {
          this.cubicajeRecipiente.tipoVehiculoCargaTerrestre = tipo[0];
      }
  }

  private setTiposVehiculosCargaTerrestre(){
    this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
  }
}

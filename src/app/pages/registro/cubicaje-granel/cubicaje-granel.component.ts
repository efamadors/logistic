import { Component, OnInit } from '@angular/core';
import { CubicajeGranel } from '../../../models/CubicajeGranel';
import { TipoVehiculoCargaTerrestre } from '../../../models/TipoVehiculoCargaTerrestre';
import { CubicajeResult } from '../../../models/CubicajeResult';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-cubicaje-granel',
  templateUrl: './cubicaje-granel.component.html',
  styleUrls: ['./cubicaje-granel.component.css']
})
export class CubicajeGranelComponent {
  cubicajeGranel : CubicajeGranel;
  tiposVehiculoCargaTerrestres: TipoVehiculoCargaTerrestre[];
  cubicajeResult: CubicajeResult;

  constructor(private generalService: GeneralService){
    this.cubicajeGranel = new CubicajeGranel();
    this.cubicajeResult = new CubicajeResult();
    
    this.setTiposVehiculosCargaTerrestre();
  }

  calcular(){
    this.cubicajeResult = this.generalService.calculateCubicajeGranel(this.cubicajeGranel);
  }

  tipoVehiculoCargaTerrestreChange(event){
    const tipo = this.tiposVehiculoCargaTerrestres.filter(r => r.tipo == event.target.value);
    if (tipo) {
        this.cubicajeGranel.tipoVehiculoCargaTerrestre = tipo[0];
    }
}

private setTiposVehiculosCargaTerrestre(){
  this.tiposVehiculoCargaTerrestres = this.generalService.getTiposVehiculosCargaTerrestre();
}
}

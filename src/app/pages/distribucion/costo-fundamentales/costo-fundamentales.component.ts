import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { ActividadFundamentalResponse, LogisticState } from 'app/ngxs/logistic.state';
import { Observable } from 'rxjs';
import { Actividad } from '../../../models/Actividades';
import { DatabaseService } from '../../../services/database.service';
import { GeneralService } from '../../../services/general.service';
import { EditarFundamentalComponent } from './editar-fundamental/editar-fundamental.component';

@Component({
  selector: 'app-costo-fundamentales',
  templateUrl: './costo-fundamentales.component.html',
  styleUrls: ['./costo-fundamentales.component.scss']
})
export class CostoFundamentalesComponent implements OnInit {
  @Input() nombreEmpresa: string;
  @Input() totalKm: number;
  @Input() costoKm: number;
  @Output() indicadoresFundamentalesChange = new EventEmitter<Actividad[]>();
  @Select(LogisticState.getActividadesFundamentales) actividadesFundamentalesMant$: Observable<ActividadFundamentalResponse>;
  
  totalCosteApoyo: number;
  indicadores: Actividad[];

  constructor(private generalServicio: GeneralService, private database: DatabaseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.indicadores = new Array<Actividad>();
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarFundamentalComponent);
    const newActividad = new Actividad();
    newActividad.id = actividad.id;
    newActividad.descripcion = actividad.descripcion;
    newActividad.monto = actividad.monto;

    modalRef.componentInstance.actividad = newActividad;
    modalRef.result.then(()=> this.calcularIndicadores());
  }

  agregar() {
    // const modalRef = this.modalService.open(CrearFundamentalComponent);
    // modalRef.result.then((res)=>{
    //   if (res){
    //     this.actividades.push(res);
    //     this.calcularIndicadores();
    //   }
    // })
  }

  calcularIndicadores(){
    // this.indicadores = new Array<Actividad>();
    // this.calcularIndicadorCompustible();
    // this.otrosIndicadores();
    // this.database.saveIndicadoresFundamentales(this.indicadores);
    // this.indicadoresFundamentalesChange.emit(this.indicadores); 
  }

  calcularIndicadorCompustible(){
    // const indicadorCombustible = this.generalServicio.getIndicadorCombustible(this.actividades);
    // const indicador = new Actividad();
    // indicador.descripcion = "Indicador de combustible";
    // indicador.monto = indicadorCombustible;
    // this.indicadores.push(indicador);
  }

  otrosIndicadores(){
    // const indicadorOtros = this.generalServicio.getIndicadoresOtros(this.actividades, this.costoKm);
    // indicadorOtros.forEach(item => {
    //   this.indicadores.push(item);
    // })
  }
}

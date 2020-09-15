import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actividad } from '../../../models/Actividades';
import { DatabaseService } from '../../../services/database.service';
import { GeneralService } from '../../../services/general.service';
import { CrearFundamentalComponent } from './crear-fundamental/crear-fundamental.component';
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

  totalCosteApoyo: number;
  actividades: Actividad[];
  indicadores: Actividad[];

  constructor(private generalServicio: GeneralService, private database: DatabaseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.actividades = this.generalServicio.getActividadesFundamentales();
    this.indicadores = new Array<Actividad>();
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarFundamentalComponent);
    modalRef.componentInstance.actividad = actividad;
    modalRef.result.then(()=> this.calcularIndicadores());
  }

  agregar() {
    const modalRef = this.modalService.open(CrearFundamentalComponent);
    modalRef.result.then((res)=>{
      if (res){
        this.actividades.push(res);
        this.calcularIndicadores();
      }
    })
  }

  calcularIndicadores(){
    this.indicadores = new Array<Actividad>();
    this.calcularIndicadorCompustible();
    this.otrosIndicadores();
    this.database.saveIndicadoresFundamentales(this.indicadores);
    this.indicadoresFundamentalesChange.emit(this.indicadores); 
  }

  calcularIndicadorCompustible(){
    const indicadorCombustible = this.generalServicio.getIndicadorCombustible(this.actividades);
    const indicador = new Actividad();
    indicador.descripcion = "Indicador de combustible";
    indicador.monto = indicadorCombustible;
    this.indicadores.push(indicador);
  }

  otrosIndicadores(){
    const indicadorOtros = this.generalServicio.getIndicadoresOtros(this.actividades, this.costoKm);
    indicadorOtros.forEach(item => {
      this.indicadores.push(item);
    })
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'app/services/database.service';
import { GeneralService } from 'app/services/general.service';
import { Actividad } from '../../../models/Actividades';
import { CrearActividadComponent } from './crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './editar-actividad/editar-actividad.component';

@Component({
  selector: 'app-costo-actividades',
  templateUrl: './costo-actividades.component.html',
  styleUrls: ['./costo-actividades.component.scss']
})
export class CostoActividadesComponent implements OnInit {
  @Input() nombreEmpresa: string;
  @Input() totalKm: number;
   
  totalCosteApoyo: number;
  costoKm: number;
  actividades: Actividad[];

  constructor(private generalServicio: GeneralService, private database: DatabaseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    let actividades = this.database.getActividadesApayo();
    if (!actividades || actividades.length == 0){
      actividades = this.generalServicio.getActividades();
    }
    this.actividades = actividades;
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarActividadComponent);
    modalRef.componentInstance.actividad = actividad;
    modalRef.result.then(()=>this.calcularCosto());
  }

  agregar() {
    const modalRef = this.modalService.open(CrearActividadComponent);
    modalRef.result.then((res)=>{
      if (res){
        this.actividades.push(res);
        this.calcularCosto();
      }
    })
  }

  calcularCosto() {
    this.totalCosteApoyo = this.generalServicio.getTotalCostoApoyo(this.actividades);  
    if (this.totalKm > 0) this.costoKm = this.totalCosteApoyo / this.totalKm;
    this.database.saveActividadesApayo(this.actividades);
  }

  calcular() {

  }
}

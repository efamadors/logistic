import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { DeleteActividadApoyoAction } from 'app/ngxs/logistic.actions';
import { ActividadApoyoResponse, LogisticState } from 'app/ngxs/logistic.state';
import { DatabaseService } from 'app/services/database.service';
import { GeneralService } from 'app/services/general.service';
import { Observable } from 'rxjs';
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
  
  totalCosteApoyo: number;
  costoKm: number;
  @Select(LogisticState.getActividadesApoyo) actividadApoyoResponse: Observable<ActividadApoyoResponse>;

  constructor(private generalServicio: GeneralService, private database: DatabaseService, private modalService: NgbModal, private store: Store) { }

  ngOnInit(): void {
    this.actividadApoyoResponse.subscribe(actividadApoyoResponse => {
      this.totalCosteApoyo = actividadApoyoResponse.totalCosteApoyo;
      this.costoKm = actividadApoyoResponse.costoxKm;    
    });
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarActividadComponent);
    const newActividad = new Actividad();
    newActividad.descripcion = actividad.descripcion;
    newActividad.id = actividad.id;
    newActividad.monto = actividad.monto;
    modalRef.componentInstance.actividad = newActividad;
    modalRef.result.then(()=>this.calcularCosto());
  }

  agregar() {
    const modalRef = this.modalService.open(CrearActividadComponent);
    modalRef.result.then((res)=>{
      if (res){
        // this.actividades.push(res);
        // this.calcularCosto();
      }
    })
  }

  calcularCosto() {
   
  }

  delete(actividad: Actividad) {
    this.store.dispatch(new DeleteActividadApoyoAction(actividad));
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { LogisticState, OtrasActividadesResponse } from 'app/ngxs/logistic.state';
import { Observable } from 'rxjs';
import { Actividad } from '../../../models/Actividades';
import { GeneralService } from '../../../services/general.service';
import { EditarOtroCostoComponent } from './editar-otro-costo/editar-otro-costo.component';

@Component({
  selector: 'app-otros-costos',
  templateUrl: './otros-costos.component.html',
  styleUrls: ['./otros-costos.component.scss']
})
export class OtrosCostosComponent implements OnInit {
  @Input() nombreEmpresa: string;
  @Input() totalKm: number;
  @Output() otrosCostosChange = new EventEmitter<Actividad[]>();
  @Select(LogisticState.getOtrasActividades) otrasActividadesMant$: Observable<OtrasActividadesResponse>;
  
  totalCosteApoyo: number;
  costoKm: number;
  actividades: Actividad[];

  constructor(private generalServicio: GeneralService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.actividades = this.generalServicio.getOtrasActividades();
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarOtroCostoComponent);
    const newActividad = new Actividad();
    newActividad.id = actividad.id;
    newActividad.descripcion = actividad.descripcion;
    newActividad.monto = actividad.monto;
    modalRef.componentInstance.actividad = newActividad;
    this.otrosCostosChange.emit(this.actividades);
  }

}

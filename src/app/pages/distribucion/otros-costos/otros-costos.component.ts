import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  
  totalCosteApoyo: number;
  costoKm: number;
  actividades: Actividad[];

  constructor(private generalServicio: GeneralService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.actividades = this.generalServicio.getOtrasActividades();
  }

  edit(actividad: Actividad) {
    const modalRef = this.modalService.open(EditarOtroCostoComponent);
    modalRef.componentInstance.actividad = actividad;
    this.otrosCostosChange.emit(this.actividades);
  }

}

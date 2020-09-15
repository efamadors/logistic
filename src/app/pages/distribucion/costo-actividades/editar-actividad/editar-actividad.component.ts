import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actividad } from '../../../../models/Actividades';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }
}

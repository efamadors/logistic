import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { UpdateActividadApoyoAction } from 'app/ngxs/logistic.actions';
import { Actividad } from '../../../../models/Actividades';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }

  close(){
    this.store.dispatch(new UpdateActividadApoyoAction(this.actividad));
    this.activeModal.close(this.actividad)
  }
}

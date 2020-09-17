import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Actividad } from 'app/models/Actividades';
import { UpdateOtraActividadAction } from 'app/ngxs/logistic.actions';

@Component({
  selector: 'app-editar-otro-costo',
  templateUrl: './editar-otro-costo.component.html',
  styleUrls: ['./editar-otro-costo.component.scss']
})
export class EditarOtroCostoComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }

  close(){
    this.store.dispatch(new UpdateOtraActividadAction(this.actividad));
    this.activeModal.close(this.actividad)
  }
}

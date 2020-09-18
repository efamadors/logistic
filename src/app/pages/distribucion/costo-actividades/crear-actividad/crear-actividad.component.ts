import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Actividad } from 'app/models/Actividades';
import { AddActividadApoyoAction } from 'app/ngxs/logistic.actions';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.scss']
})
export class CrearActividadComponent implements OnInit {
  actividad: Actividad;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.actividad = new Actividad();
  }


  agregar(){
    this.store.dispatch(new AddActividadApoyoAction(this.actividad));
    this.activeModal.close(this.actividad)
  }

  ngOnInit() {
  }
}

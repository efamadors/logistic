import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Actividad } from 'app/models/Actividades';
import { AddActividadFundamentalAction } from 'app/ngxs/logistic.actions';

@Component({
  selector: 'app-crear-fundamental',
  templateUrl: './crear-fundamental.component.html',
  styleUrls: ['./crear-fundamental.component.scss']
})
export class CrearFundamentalComponent implements OnInit {
  actividad: Actividad;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }

  agregar(){
    this.store.dispatch(new AddActividadFundamentalAction(this.actividad));
    this.activeModal.close(this.actividad);
  }
}

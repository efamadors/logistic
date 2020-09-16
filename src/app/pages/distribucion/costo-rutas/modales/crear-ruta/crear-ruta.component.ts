import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../../../models/Ruta';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { AddRutaAction } from '../../../../../ngxs/logistic.actions';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.scss']
})
export class CrearRutaComponent implements OnInit {
  ruta: Ruta;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.ruta = new Ruta();
  }

  ngOnInit() {
  }

  add() {
    this.store.dispatch(new AddRutaAction(this.ruta))
    this.activeModal.close();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { UpdateRutaAction } from '../../../../../ngxs/logistic.actions';
import { Ruta } from '../../../../../models/Ruta';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.css']
})
export class EditarRutaComponent implements OnInit {
  @Input() ruta: Ruta;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.ruta = new Ruta();
  }

  ngOnInit(): void {
  }

  close() {
    this.store.dispatch(new UpdateRutaAction(this.ruta))
    this.activeModal.close();
  }
}

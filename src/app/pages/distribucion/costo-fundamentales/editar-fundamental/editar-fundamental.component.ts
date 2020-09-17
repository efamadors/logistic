import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { UpdateActividadesFundamentalesAction } from 'app/ngxs/logistic.actions';

import { Actividad } from '../../../../models/Actividades';

@Component({
  selector: 'app-editar-fundamental',
  templateUrl: './editar-fundamental.component.html',
  styleUrls: ['./editar-fundamental.component.scss']
})
export class EditarFundamentalComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal, private store: Store) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }

  close(){
    this.store.dispatch(new UpdateActividadesFundamentalesAction(this.actividad));
    this.activeModal.close(this.actividad)
  }
}

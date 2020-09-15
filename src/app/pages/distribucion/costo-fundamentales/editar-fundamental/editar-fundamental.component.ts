import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Actividad } from '../../../../models/Actividades';

@Component({
  selector: 'app-editar-fundamental',
  templateUrl: './editar-fundamental.component.html',
  styleUrls: ['./editar-fundamental.component.scss']
})
export class EditarFundamentalComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actividad } from 'app/models/Actividades';

@Component({
  selector: 'app-editar-otro-costo',
  templateUrl: './editar-otro-costo.component.html',
  styleUrls: ['./editar-otro-costo.component.scss']
})
export class EditarOtroCostoComponent implements OnInit {
  @Input() actividad: Actividad;

  constructor(public activeModal: NgbActiveModal) {
    this.actividad = new Actividad();
  }

  ngOnInit() {
  }

}

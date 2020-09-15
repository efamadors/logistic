import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../../../models/Ruta';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.scss']
})
export class CrearRutaComponent implements OnInit {
  ruta: Ruta;

  constructor(public activeModal: NgbActiveModal) {
    this.ruta = new Ruta();
  }

  ngOnInit() {
  }

}

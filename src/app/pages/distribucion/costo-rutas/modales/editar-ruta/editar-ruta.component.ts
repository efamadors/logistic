import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta } from '../../../../../models/Ruta';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.css']
})
export class EditarRutaComponent implements OnInit {
  @Input() ruta: Ruta;

  constructor(public activeModal: NgbActiveModal) {
    this.ruta = new Ruta();
  }

  ngOnInit(): void {
  }

  close() {
    this.ruta.calcularRecorrido();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ruta } from '../../../models/Ruta';
import { GeneralService } from '../../../services/general.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarRutaComponent } from './modales/editar-ruta/editar-ruta.component';
import { CrearRutaComponent } from './modales/crear-ruta/crear-ruta.component';
import { DatabaseService } from '../../../services/database.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogisticState, RutasResponse } from '../../../ngxs/logistic.state';
import { DeleteRutaAction } from 'app/ngxs/logistic.actions';

@Component({
  selector: 'app-costo-distribucion-rutas',
  templateUrl: './costo-distribucion-rutas.component.html',
  styleUrls: ['./costo-distribucion-rutas.component.css']
})
export class CostoDistribucionRutasComponent implements OnInit {
  @Input() nombreEmpresa: string ;
  @Input() cantidadContenedores: number;
  @Output() totalKmChange = new EventEmitter<number>();
  @Output() costoKmChange = new EventEmitter<number>();
  @Output() rutasChange = new EventEmitter<Ruta[]>();
  @Select(LogisticState.getRutas) rutasResponse: Observable<RutasResponse>;

  kmPorEquipo: number;
  totalKm: number;

  constructor(private generalServicio: GeneralService, private modalService: NgbModal, private store: Store) {
   }

  ngOnInit(): void {
    this.rutasResponse.subscribe(rutasMant => {
      this.totalKm = rutasMant.totalKm;
      if (this.cantidadContenedores > 0) this.kmPorEquipo = rutasMant.totalKm / this.cantidadContenedores;
    })
  }

  edit(ruta: Ruta){
    const modalRef = this.modalService.open(EditarRutaComponent);
    let rutanew = new Ruta();
    rutanew.origen = ruta.origen;
    rutanew.destino = ruta.destino;
    rutanew.distancia = ruta.distancia;
    rutanew.cantidadViajes = ruta.cantidadViajes;
    rutanew.id = ruta.id;
    rutanew.recorrido = ruta.recorrido;

    modalRef.componentInstance.ruta = rutanew;
    modalRef.result.then(()=>this.calcularKm());
  }

  agregar(){
    const modalRef = this.modalService.open(CrearRutaComponent);
    modalRef.result.then((res)=>{
      if (res){
        this.calcularKm();
      }
    })
  }

  calcularKm(){
    
  }

  delete(ruta: Ruta){
    this.store.dispatch(new DeleteRutaAction(ruta));
  }
}

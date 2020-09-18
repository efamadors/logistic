import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { RegistroComponent } from '../../pages/registro/registro.component';
import { CubicajeGeneralComponent } from '../../pages/registro/cubicaje-general/cubicaje-general.component';
import { CubicajeRecipientesComponent } from '../../pages/registro/cubicaje-recipientes/cubicaje-recipientes.component';
import { CubicajeGranelComponent } from '../../pages/registro/cubicaje-granel/cubicaje-granel.component';
import { CostoDistribucionRutasComponent } from '../../pages/distribucion/costo-rutas/costo-distribucion-rutas.component';
import { CrearRutaComponent } from '../../pages/distribucion/costo-rutas/modales/crear-ruta/crear-ruta.component';
import { EditarRutaComponent } from '../../pages/distribucion/costo-rutas/modales/editar-ruta/editar-ruta.component';
import { DistribucionCostoComponent } from '../../pages/distribucion/distribucion-costo.component';
import { CostoActividadesComponent } from '../../pages/distribucion/costo-actividades/costo-actividades.component';
import { CrearActividadComponent } from '../../pages/distribucion/costo-actividades/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from '../../pages/distribucion/costo-actividades/editar-actividad/editar-actividad.component';
import { CostoFundamentalesComponent } from '../../pages/distribucion/costo-fundamentales/costo-fundamentales.component';
import { EditarFundamentalComponent } from '../../pages/distribucion/costo-fundamentales/editar-fundamental/editar-fundamental.component';
import { CrearFundamentalComponent } from '../../pages/distribucion/costo-fundamentales/crear-fundamental/crear-fundamental.component';
import { OtrosCostosComponent } from '../../pages/distribucion/otros-costos/otros-costos.component';
import { EditarOtroCostoComponent } from '../../pages/distribucion/otros-costos/editar-otro-costo/editar-otro-costo.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    RegistroComponent,
    CubicajeGeneralComponent,
    CubicajeRecipientesComponent,
    CubicajeGranelComponent,
    CostoDistribucionRutasComponent,
    EditarRutaComponent,
    CrearRutaComponent,
    DistribucionCostoComponent,
    CostoActividadesComponent,
    CrearActividadComponent,
    EditarActividadComponent,
    CostoFundamentalesComponent,
    EditarFundamentalComponent,
    CrearFundamentalComponent,
    OtrosCostosComponent,
    EditarOtroCostoComponent
  ]
})

export class AdminLayoutModule {}

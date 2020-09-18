import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { RegistroComponent } from '../../pages/registro/registro.component';
import { DistribucionCostoComponent } from '../../pages/distribucion/distribucion-costo.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cubicaje',        component: RegistroComponent },
    { path: 'distribucion-costos', component: DistribucionCostoComponent }
];

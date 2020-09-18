import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/cubicaje',            title: 'Cubicaje',          icon:'nc-single-copy-04',    class: '' },
    { path: '/distribucion-costos', title: 'Distribucion Costo',icon:'nc-delivery-fast',    class: '' },
    { path: '/dashboard',           title: 'Grafico',           icon:'nc-chart-bar-32',    class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

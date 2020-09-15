import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetRutasAction } from './ngxs/logistic.actions';
import { DatabaseService } from './services/database.service';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  constructor(store: Store, generalService: GeneralService, databaseService: DatabaseService){
    let rutas = databaseService.getRutas();
    if (!rutas || rutas.length == 0){
      rutas = generalService.getDistribucionRutas();
    }
    store.dispatch(new GetRutasAction(rutas));
  }
}

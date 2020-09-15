import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Ruta } from '../models/Ruta';
import { GetRutasAction } from './logistic.actions';

export class LogisticStateModel {
  rutas: Ruta[];
}

@State<LogisticStateModel>({
  name: 'rutas',
  defaults: {
    rutas: new Array<Ruta>()
  }
})
export class LogisticState {
  @Selector()
  static getRutas(state: LogisticStateModel) { return state.rutas; }

  @Action(GetRutasAction)
  addRutas({ setState }: StateContext<LogisticStateModel>, { payload }: GetRutasAction) {
    return new Promise((resolve) => {
      setState({
        rutas: payload
      });
      resolve();
    })
  }
}
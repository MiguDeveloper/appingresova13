import { ActionReducerMap } from '@ngrx/store';
import { State, uiReducer } from './share/ui.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';
import {
  IngEgreState,
  ingresoEgresoReducer,
} from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: State;
  user: AuthState;
  //ingresosEgresos: IngEgreState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
  //ingresosEgresos: ingresoEgresoReducer,
};

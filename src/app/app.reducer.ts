import { ActionReducerMap } from '@ngrx/store';
import { State, uiReducer } from './share/ui.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
  ui: State;
  user: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
};

import { setUser, unSetuser } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Usuario } from './../models/usuario.model';
import { state } from '@angular/animations';

export interface AuthState {
  user: Usuario;
}

export const initialState: AuthState = { user: null };

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unSetuser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: AuthState = initialState, action: Action) {
  return _authReducer(state, action);
}

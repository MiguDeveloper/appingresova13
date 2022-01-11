import { Usuario } from './../models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[AUTH] setUser',
  props<{ user: Usuario }>()
);
export const unSetuser = createAction('[AUTH] unSetUser');

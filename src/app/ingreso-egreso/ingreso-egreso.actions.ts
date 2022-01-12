import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createAction, props } from '@ngrx/store';

export const setItems = createAction(
  '[IngresoEgreso] Set Items',
  props<{ items: IngresoEgreso[] }>()
);
export const unsetItems = createAction('[IngresoEgreso] Unset Items');

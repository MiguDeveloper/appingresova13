import { isLoading, isStop } from './ui.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

export const initialState: State = { isLoading: false };

const _uiReducer = createReducer(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(isStop, (state) => ({ ...state, isLoading: false }))
);

export function uiReducer(state: State = initialState, action: Action) {
  return _uiReducer(state, action);
}

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ThemeActions from './theme.actions';
import { ThemeEntity } from './theme.models';

export const THEME_FEATURE_KEY = 'theme';

export interface State extends EntityState<ThemeEntity> {
  darkMode: boolean
}

export interface ThemePartialState {
  readonly [THEME_FEATURE_KEY]: State;
}

export const themeAdapter: EntityAdapter<ThemeEntity> =
  createEntityAdapter<ThemeEntity>();

export const initialState: State = themeAdapter.getInitialState({
  darkMode: false
});

const themeReducer = createReducer(
  initialState,

  on(ThemeActions.themeToggle, (state) => {
    return ({ ...state, darkMode: !state.darkMode })
  }),

);

export function reducer(state: State | undefined, action: Action) {
  return themeReducer(state, action);
}

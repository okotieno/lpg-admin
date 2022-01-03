import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DRAWER_FEATURE_KEY, State } from './drawer.reducer';

export const getDrawerState = createFeatureSelector<State>(DRAWER_FEATURE_KEY);

export const getDrawerOpen = createSelector(
  getDrawerState,
  (state: State) => state.open
);

export const getDrawerMini = createSelector(
  getDrawerState,
  (state: State) => state.mini
);

export const getShowDrawerHeader = createSelector(
  getDrawerOpen,
  getDrawerMini,
  (open, mini) => {
    console.log({ open, mini })

    return !open && !mini
  }
);


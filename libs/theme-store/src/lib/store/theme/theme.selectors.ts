import { createFeatureSelector, createSelector } from '@ngrx/store';
import { THEME_FEATURE_KEY, State } from "./theme.reducer";

export const getThemeState = createFeatureSelector<State>(THEME_FEATURE_KEY);

export const getDarkMode = createSelector(
  getThemeState,
  (state: State) => !!state?.darkMode
);

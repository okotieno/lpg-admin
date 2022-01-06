import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ERROR_FEATURE_KEY } from "./reducer";
import { State } from './reducer';

export const selectErrorState = createFeatureSelector<State>(ERROR_FEATURE_KEY);
export const selectPageError = createSelector(
  selectErrorState,
  (state) => state.pageError
)

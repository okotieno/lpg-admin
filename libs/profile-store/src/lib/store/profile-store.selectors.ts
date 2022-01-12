import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROFILE_STORE_FEATURE_KEY,
  State,
} from './profile-store.reducer';

export const getProfileStoreState = createFeatureSelector<State>(
  PROFILE_STORE_FEATURE_KEY
);


export const getMyProfileStoreState = createSelector(
  getProfileStoreState,
  (state: State) => state.myProfile
);



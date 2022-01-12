import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProfileStoreActions from './profile-store.actions';
import { ProfileStoreEntity } from './profile-store.models';
import { IUser } from "@lpg/data";

export const PROFILE_STORE_FEATURE_KEY = 'profileStore';

export interface State extends EntityState<ProfileStoreEntity> {
  myProfile: IUser
}

export interface ProfileStorePartialState {
  readonly [PROFILE_STORE_FEATURE_KEY]: State;
}

export const profileStoreAdapter: EntityAdapter<ProfileStoreEntity> =
  createEntityAdapter<ProfileStoreEntity>();

export const initialState: State = profileStoreAdapter.getInitialState({
  // set initial required properties
  myProfile: {
    phone: '',
    email: '',
    stationSpecificRoles: [],
    userId: 0,
    access_token: '',
    firstName: '',
    lastName: '',
    name: '',
    permissions: [],
    roles: [],
    username: ''
  }
});

const profileStoreReducer = createReducer(
  initialState,
  on(ProfileStoreActions.init, (state) => ({ ...state, ...initialState })),
  on(ProfileStoreActions.loadProfileStoreSuccess, (state, { data }) =>
    ({ ...state, myProfile: data })
  ),
  on(ProfileStoreActions.clearProfileStore, (state) =>
    ({ ...state, myProfile: initialState.myProfile })
  ),
  on(ProfileStoreActions.loadProfileStoreFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return profileStoreReducer(state, action);
}

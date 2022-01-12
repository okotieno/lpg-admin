import { Action } from '@ngrx/store';

import * as ProfileStoreActions from './profile-store.actions';
import { ProfileStoreEntity } from './profile-store.models';
import { State, initialState, reducer } from './profile-store.reducer';

describe('ProfileStore Reducer', () => {
  const createProfileStoreEntity = (
    id: string,
    name = ''
  ): ProfileStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid ProfileStore actions', () => {
    it('loadProfileStoreSuccess should return the list of known ProfileStore', () => {
      const profileStore = [
        createProfileStoreEntity('PRODUCT-AAA'),
        createProfileStoreEntity('PRODUCT-zzz'),
      ];
      const action = ProfileStoreActions.loadProfileStoreSuccess({
        profileStore,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

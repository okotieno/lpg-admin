import { ProfileStoreEntity } from './profile-store.models';
import {
  profileStoreAdapter,
  ProfileStorePartialState,
  initialState,
} from './profile-store.reducer';
import * as ProfileStoreSelectors from './profile-store.selectors';

describe('ProfileStore Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProfileStoreId = (it: ProfileStoreEntity) => it.id;
  const createProfileStoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProfileStoreEntity);

  let state: ProfileStorePartialState;

  beforeEach(() => {
    state = {
      profileStore: profileStoreAdapter.setAll(
        [
          createProfileStoreEntity('PRODUCT-AAA'),
          createProfileStoreEntity('PRODUCT-BBB'),
          createProfileStoreEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('ProfileStore Selectors', () => {
    it('getAllProfileStore() should return the list of ProfileStore', () => {
      const results = ProfileStoreSelectors.getAllProfileStore(state);
      const selId = getProfileStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProfileStoreSelectors.getSelected(
        state
      ) as ProfileStoreEntity;
      const selId = getProfileStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getProfileStoreLoaded() should return the current "loaded" status', () => {
      const result = ProfileStoreSelectors.getProfileStoreLoaded(state);

      expect(result).toBe(true);
    });

    it('getProfileStoreError() should return the current "error" state', () => {
      const result = ProfileStoreSelectors.getProfileStoreError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

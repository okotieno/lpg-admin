import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ProfileStoreActions from './profile-store.actions';
import { ProfileStoreEffects } from './profile-store.effects';
import { ProfileStoreFacade } from './profile-store.facade';
import { ProfileStoreEntity } from './profile-store.models';
import {
  PROFILE_STORE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './profile-store.reducer';
import * as ProfileStoreSelectors from './profile-store.selectors';

interface TestSchema {
  profileStore: State;
}

describe('ProfileStoreFacade', () => {
  let facade: ProfileStoreFacade;
  let store: Store<TestSchema>;
  const createProfileStoreEntity = (
    id: string,
    name = ''
  ): ProfileStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PROFILE_STORE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ProfileStoreEffects]),
        ],
        providers: [ProfileStoreFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ProfileStoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allProfileStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allProfileStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadProfileStoreSuccess` to manually update list
     */
    it('allProfileStore$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allProfileStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ProfileStoreActions.loadProfileStoreSuccess({
          profileStore: [
            createProfileStoreEntity('AAA'),
            createProfileStoreEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allProfileStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

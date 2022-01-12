import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProfileStoreActions from './profile-store.actions';
import { ProfileStoreEffects } from './profile-store.effects';

describe('ProfileStoreEffects', () => {
  let actions: Observable<Action>;
  let effects: ProfileStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProfileStoreEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProfileStoreEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProfileStoreActions.init() });

      const expected = hot('-a-|', {
        a: ProfileStoreActions.loadProfileStoreSuccess({ profileStore: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

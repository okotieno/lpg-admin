import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ProfileStoreActions from './profile-store.actions';
import * as ProfileStoreSelectors from './profile-store.selectors';

@Injectable()
export class ProfileStoreFacade {
  myProfile$ = this.store.select(ProfileStoreSelectors.getMyProfileStoreState);

  constructor(private readonly store: Store) {
  }

  init() {
    this.store.dispatch(ProfileStoreActions.init());
  }

  clear() {
    this.store.dispatch(ProfileStoreActions.clear());
  }
}

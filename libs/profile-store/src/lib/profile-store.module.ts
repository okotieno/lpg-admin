import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProfileStore from './store/profile-store.reducer';
import { ProfileStoreEffects } from './store/profile-store.effects';
import { ProfileStoreFacade } from './store/profile-store.facade';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ProfileStoreEffects]),
    StoreModule.forFeature(
      fromProfileStore.PROFILE_STORE_FEATURE_KEY,
      fromProfileStore.reducer
    ),
  ],
  providers: [ProfileStoreFacade],
})
export class ProfileStoreModule {}

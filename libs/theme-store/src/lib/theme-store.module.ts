import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import * as fromTheme from './store/theme/theme.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTheme.THEME_FEATURE_KEY, fromTheme.reducer),
  ],
})
export class ThemeStoreModule {}

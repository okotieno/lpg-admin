import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderModule } from '@lpg/header';
import { SidenavModule } from '@lpg/sidenav';
import { StoreModule } from '@ngrx/store';
import * as fromDrawer from './state/drawer/drawer.reducer';
import * as fromTheme from './state/theme/theme.reducer';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SidenavModule,
    StoreModule.forFeature(fromDrawer.DRAWER_FEATURE_KEY, fromDrawer.reducer),
    StoreModule.forFeature(fromTheme.THEME_FEATURE_KEY, fromTheme.reducer),
    MatSidenavModule,
    MatButtonModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: []
})
export class LayoutModule {}

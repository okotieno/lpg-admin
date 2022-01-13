import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderModule } from '@lpg/header';
import { SidenavModule } from '@lpg/sidenav';
import { StoreModule } from '@ngrx/store';
import * as fromDrawer from './state/drawer/drawer.reducer';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { ThemeStoreModule } from "@lpg/theme-store";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    SidenavModule,
    StoreModule.forFeature(fromDrawer.DRAWER_FEATURE_KEY, fromDrawer.reducer),
    MatSidenavModule,
    MatButtonModule,
    ThemeStoreModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: []
})
export class LayoutModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderModule } from "@lpg/header";
import { SidenavModule } from "@lpg/sidenav";

@NgModule({
  imports: [CommonModule, HeaderModule, SidenavModule],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {}

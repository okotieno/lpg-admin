import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from "@lpg/layout";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from "@lpg/layout";
import { MatGridListModule } from "@angular/material/grid-list";
import { StatsCardModule } from "@lpg/stats-card";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
    MatGridListModule,
    StatsCardModule
  ],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatRippleModule, RouterModule],
  declarations: [
    StatsCardComponent
  ],
  exports: [
    StatsCardComponent
  ],
})
export class StatsCardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotsComponent } from './depots/depots.component';
import { RouterModule } from "@angular/router";
import { LayoutModule } from "@lpg/layout";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AddDepotModule } from "@lpg/add-depot";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DepotsComponent}
    ]),
    LayoutModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddDepotModule,
    MatDialogModule
  ],
  declarations: [
    DepotsComponent
  ],
})
export class DepotsModule {}

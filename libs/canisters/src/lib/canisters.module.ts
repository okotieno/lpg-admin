import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CanistersComponent } from './canisters.component';
import { LayoutModule } from "@lpg/layout";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { AddCanisterModule } from "@lpg/add-canister";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: CanistersComponent}
    ]),
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    AddCanisterModule
  ],
  declarations: [
    CanistersComponent
  ],
})
export class CanistersModule {}

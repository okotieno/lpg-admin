import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransporterComponent } from './transporter/transporter.component';
import { LayoutModule } from "@lpg/layout";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { AddTransporterModule } from "@lpg/add-transporter";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: TransporterComponent}
    ]),
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    AddTransporterModule
  ],
  declarations: [
    TransporterComponent
  ],
})
export class TransportersModule {
}

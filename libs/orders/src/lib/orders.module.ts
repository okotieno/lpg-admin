import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { LayoutModule } from "@lpg/layout";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AddOrderModule } from "@lpg/add-order";
import { AssignOrderModule } from "@lpg/assign-order";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: OrdersComponent}
    ]),
    LayoutModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    AddOrderModule,
    AssignOrderModule
  ],
  declarations: [
    OrdersComponent
  ],
})
export class OrdersModule {}

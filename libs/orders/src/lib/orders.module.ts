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
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ActionConfirmationModule } from "@lpg/action-confirmation";
import { CanisterDispatchConfirmationModule } from "@lpg/canister-dispatch-confirmation";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";

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
    AssignOrderModule,
    MatProgressBarModule,
    ActionConfirmationModule,
    CanisterDispatchConfirmationModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [
    OrdersComponent
  ],
})
export class OrdersModule {}

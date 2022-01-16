import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { LayoutModule } from "@lpg/layout";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: OrdersComponent}
    ]),
    LayoutModule
  ],
  declarations: [
    OrdersComponent
  ],
})
export class OrdersModule {}

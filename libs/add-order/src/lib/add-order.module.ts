import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './add-order.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AddOrderComponent
  ],
  exports: [
    AddOrderComponent
  ],
})
export class AddOrderModule {}

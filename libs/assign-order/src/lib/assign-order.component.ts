import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { FormBuilder, Validators } from "@angular/forms";
import { TransportersService } from "@lpg/transporters-service";
import { OrderStatusService } from "@lpg/order-status-service";
import { IOrder } from "@lpg/data";
import { take, tap } from "rxjs";

@Component({
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.scss']
})
export class AssignOrderComponent {
  @Output() assigned = new EventEmitter();
  form = this.fb.group({
    transporterId: ['', [Validators.required]]
  });
  transporters$ = this.transportersService.transporters$;

  constructor(
    private modalService: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private fb: FormBuilder,
    private transportersService: TransportersService,
    private orderAssignmentService: OrderStatusService
    ) {
  }

  submit() {
    this.orderAssignmentService.assignOrderToTransporter({
      ...this.form.value, orderId: this.data.orderId
    }).pipe(
      take(1),
      tap(() => this.assigned.emit(true)),
      tap(() => this.modalService.closeAll()),
    ).subscribe()
  }
}

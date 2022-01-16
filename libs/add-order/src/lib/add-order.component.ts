import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IOrder } from "@lpg/data";
import { tap } from "rxjs";
import { OrdersService } from "../../../orders-service/src/lib/orders.service";
import { DepotsService } from "@lpg/depots-service";
import { DealersService } from "@lpg/dealers-service";

@Component({
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrderComponent implements OnInit {
  @Output() created = new EventEmitter();
  dealers$ = this.dealerService.dealers$;
  depots$ = this.depotService.depots$;

  form = this.fb.group({
    fromDepotId: ['', [Validators.required]],
    toDealerId: ['', [Validators.required]],
    orderQuantities: this.fb.array([])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private orderService: OrdersService,
    private depotService: DepotsService,
    private dealerService: DealersService
  ) {
  }

  newQuantityControl() {
    return this.fb.group({
      canisterSizeId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    })
  }

  addOrder() {
    let data = this.form.value;
    if (this.data?.orderId) {
      data = {...data, id: this.data.orderId}
    }
    const service = this.data?.orderId ? this.orderService.updateOrder(data) : this.orderService.createOrder(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
      console.log("Updated Items")
    } else {
      this.addOrderQuantity()
    }
  }

  addOrderQuantity() {
    this.orderQuantitiesControl.push(this.newQuantityControl());
  }

  get orderQuantitiesControl() {
    return this.form.get('orderQuantities') as FormArray;
  }
}

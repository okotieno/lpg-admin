import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IOrder } from "@lpg/data";
import { map, shareReplay, tap } from "rxjs";
import { OrdersService } from "../../../orders-service/src/lib/orders.service";
import { DepotsService } from "@lpg/depots-service";
import { DealersService } from "@lpg/dealers-service";
import { CanisterSizesService } from "@lpg/canister-sizes-service";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { MatTable } from "@angular/material/table";

@Component({
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrderComponent implements OnInit {
  @Output() created = new EventEmitter();
  @ViewChild(MatTable) table?: MatTable<any>;
  dealers$ = this.dealerService.dealers$.pipe(shareReplay());
  depots$ = this.depotService.depots$.pipe(shareReplay());
  sizes$ = this.canisterSizesService.getSizes({perPage: 100, page: 1}).pipe(
    map(({data}) => data),
    shareReplay()
  );
  brands$ = this.brandService.brands$;

  form = this.fb.group({
    fromDepotId: ['', [Validators.required]],
    toDealerId: ['', [Validators.required]],
    orderQuantities: this.fb.array([])
  });
  displayedQuantityColumns: string[] = ['brandType', 'canisterSize', 'quantity', 'actions'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private orderService: OrdersService,
    private depotService: DepotsService,
    private dealerService: DealersService,
    private canisterSizesService: CanisterSizesService,
    private brandService: CanisterBrandsService
  ) {
  }

  newQuantityControl(order: {canisterBrandId: number, canisterSizeId: number, quantity: number }) {
    return this.fb.group({
      canisterBrandId: [order?.canisterBrandId ?? '', [Validators.required]],
      canisterSizeId: [order?.canisterSizeId ?? '', [Validators.required]],
      quantity: [order?.quantity ?? '', [Validators.required]],
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
      this.data.orderQuantities.forEach(order => {
        this.addOrderQuantity(0,order)
      })
    } else {
      this.addOrderQuantity(0,{})
    }
  }

  addOrderQuantity(index?: number, order?: any) {
    this.orderQuantitiesControl.push(this.newQuantityControl(order));
    if (this.table) {
      (this.table as MatTable<any>).renderRows();
    }
  }

  get orderQuantitiesControl() {
    return this.form.get('orderQuantities') as FormArray;
  }

  removeQuantity(i: number) {
    this.orderQuantitiesControl.removeAt(i);
    if (this.table) {
      (this.table as MatTable<any>).renderRows();
    }
  }
}

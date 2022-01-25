import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICanister, IOrder } from "@lpg/data";
import { DepotCanisterService } from "@lpg/depot-canister-service";
import { BehaviorSubject, map, take, tap } from "rxjs";
import { OrderStatusService } from "@lpg/order-status-service";

@Component({
  templateUrl: './canister-dispatch.component.html',
  styleUrls: ['./canister-dispatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanisterDispatchComponent implements OnInit {

  totalOrderQuantity = 0;
  assigned = new EventEmitter();
  form = this.fb.group({
    canisters: [[]]
  });
  canisters$ = new BehaviorSubject<ICanister[]>([])
  showScanner = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private depotCanisterService: DepotCanisterService,
    private orderStatusService: OrderStatusService,
    private dialogService: MatDialog
  ) {
  }

  included(testValue: number) {
    return this.canistersControl.value.find(({canisterId}: { canisterId: number }) => canisterId === testValue)
  }

  get canistersControl() {
    return this.form.get('canisters') as FormControl;
  }

  submit() {
    this.orderStatusService.depotToDealerDispatch({...this.form.value, orderId: this.data.orderId})
      .pipe(
        take(1),
        tap(() => this.dialogService.closeAll()),
        tap(() => this.assigned.emit(true))
      )
      .subscribe()
  }

  ngOnInit() {

    this.depotCanisterService.getCanisters({
      depotId: this.data.fromDepotId,
      params: {filled: true, available: true}
    }).pipe(
      map(({data}) => data),
      tap((res) => this.canisters$.next(res)),
      take(1),
    ).subscribe();
    this.totalOrderQuantity = this.data.orderQuantities
      .reduce((prev, {quantity}) => prev + quantity, 0);
    this.canistersControl.setValidators([Validators.required, Validators.minLength(this.totalOrderQuantity)]);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICanister, IOrder } from "@lpg/data";
import { DepotCanisterService } from "@lpg/depot-canister-service";
import { BehaviorSubject, map, take, tap } from "rxjs";
import { OrderStatusService } from "@lpg/order-status-service";
import { MatTable } from "@angular/material/table";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { CanisterSizesService } from "@lpg/canister-sizes-service";

@Component({
  templateUrl: './canister-dispatch.component.html',
  styleUrls: ['./canister-dispatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanisterDispatchComponent implements OnInit {

  @ViewChild(MatTable) table?: MatTable<any>;
  totalOrderQuantity = 0;
  assigned = new EventEmitter();
  // form = this.fb.group({
  //   canisters: this.fb.group({
  //     tagged: this.fb.group([]),
  //     untagged: this.fb.array([])
  //   })
  //
  // });
  form = this.fb.group({
    from: [null, [Validators.required]],
    canisters: this.fb.array([this.generateNewCanister()])
  });
  canisters$ = new BehaviorSubject<ICanister[]>([])
  showScanner = false;
  displayedColumns = ['tagged', 'canisterId', 'canisterBrandId', 'canisterSizeId', 'condition', 'actions'];
  brands$ = this.brandService.brands$;
  brandCanisterSizes$ = this.canisterSizesService.sizes$;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private depotCanisterService: DepotCanisterService,
    private orderStatusService: OrderStatusService,
    private dialogService: MatDialog,
    private brandService: CanisterBrandsService,
    private canisterSizesService: CanisterSizesService
  ) {
  }

  included(testValue: number) {
    return this.canistersControl.value.find(({canisterId}: { canisterId: number }) => canisterId === testValue)
  }

  get canistersControl() {
    return this.form.get('canisters') as FormArray;
  }

  //
  // get taggedCanistersControl() {
  //   return this.form.get('canisters.tagged') as FormControl;
  // }
  //
  // get untaggedCanistersControl() {
  //   return this.form.get('canisters.untagged') as FormArray;
  // }

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
    this.form.get('from')?.setValue((this.data as any).from);
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

  generateNewCanister(tagged = true) {
    if (tagged) {
      return this.fb.group({
        tagged: [true],
        canisterId: [null, [Validators.required]],
        canisterBrandId: [{value: null, disabled: true}, [Validators.required]],
        canisterSizeId: [{value: null, disabled: true}, [Validators.required]],
        inGoodCondition: [true, [Validators.required]],
        canisterConditionDescription: [null]
      })
    }
    return this.fb.group({
      tagged: [false],
      canisterId: [{value: null, disabled: true}, [Validators.required]],
      canisterBrandId: [null, [Validators.required]],
      canisterSizeId: [null, [Validators.required]],
      inGoodCondition: [true, [Validators.required]],
      canisterConditionDescription: [null]
    })
  }

  addCanister(index: number) {
    this.canistersControl.push(this.generateNewCanister())
    this.updateTable();
  }

  updateCanister(i: number) {
    if (!this.canistersControl.get(`${i}.tagged`)?.value) {
      this.canistersControl.get(`${i}.canisterId`)?.enable({emitEvent: false});
      this.canistersControl.get(`${i}.canisterBrandId`)?.disable({emitEvent: false});
      this.canistersControl.get(`${i}.canisterBrandId`)?.setValue(null, {emitEvent: false});
      this.canistersControl.get(`${i}.canisterSizeId`)?.disable({emitEvent: false});
      this.canistersControl.get(`${i}.canisterSizeId`)?.setValue(null, {emitEvent: false});
    } else {
      this.canistersControl.get(`${i}.canisterId`)?.disable({emitEvent: false});
      this.canistersControl.get(`${i}.canisterId`)?.setValue(null, {emitEvent: false});
      this.canistersControl.get(`${i}.canisterBrandId`)?.enable({emitEvent: false});
      this.canistersControl.get(`${i}.canisterSizeId`)?.enable({emitEvent: false});
    }
  }

  removeCanister(i: number) {
    this.canistersControl.removeAt(i);
    this.updateTable();
  }

  updateTable() {
    if (this.table) {
      (this.table as MatTable<any>).renderRows();
    }
  }

  copyCanister(i: number) {
    const newControl = this.generateNewCanister(false);
    newControl.patchValue(this.canistersControl.controls[i].value);
    newControl.get('canisterId')?.setValue(null);
    this.canistersControl.push(newControl);
    this.updateTable();

  }
}

import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { DealersService } from "@lpg/dealers-service";
import { BehaviorSubject, Subject, takeUntil, tap } from "rxjs";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IBrand, IDealer } from "@lpg/data";

@Component({
  selector: 'lpg-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent implements OnInit, OnDestroy {
  @Output() created = new EventEmitter();
  destroyed$ = new Subject();
  brands$ = new BehaviorSubject<IBrand[]>([]);
  form = this.fb.group({
    'dealerName': ['', [Validators.required]],
    'dealerCode': ['', Validators.required],
    'dealerEPRALicenceNo': ['', Validators.required],
    'dealerLocation': ['', Validators.required],
    'dealerGPS': ['', Validators.required],

  });
  allSelected = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDealer,
    private fb: FormBuilder,
    private dealerService: DealersService,
    private dialog: MatDialog
  ) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
  }

  ngOnInit(): void {
    if(this.data) {
      this.form.patchValue(this.data)
    }
    this.dealerService.getDealers({perPage: 100, page: 1}).pipe(
      tap(({ data }) => {
        this.brands$.next(data)
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  addDealer() {
    let data = this.form.value;
    if (this.data?.dealerId) {
      data = { ...data, id: this.data.dealerId }
    }
    const service = this.data?.dealerId ? this.dealerService.updateDealer(data) : this.dealerService.createDealer(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }
}

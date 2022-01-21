import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { DepotsService } from "@lpg/depots-service";
import { BehaviorSubject, Subject, takeUntil, tap } from "rxjs";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IBrand, IDepot } from "@lpg/data";

@Component({
  selector: 'lpg-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.scss']
})
export class AddDepotComponent implements OnInit, OnDestroy {
  @Output() created = new EventEmitter();
  destroyed$ = new Subject();
  brands$ = new BehaviorSubject<IBrand[]>([]);
  form = this.fb.group({
    'depotName': ['', [Validators.required]],
    'canisterBrandIds': [[], [Validators.required, Validators.minLength(1)]],
    'depotLocation': ['', Validators.required],
    'depotEPRALicenceNo': ['', Validators.required],
    'depotCode': ['', Validators.required],
  });
  allSelected = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDepot,
    private fb: FormBuilder, private brandService: CanisterBrandsService,
    private depotService: DepotsService,
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
    this.brandService.getBrands({perPage: 100, page: 1}).pipe(
      tap(({ data }) => {
        this.brands$.next(data)
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.canisterBrandIdsControl.valueChanges.pipe(
      tap(({ length }: []) => {
        if(length === this.brands$.value.length) {
          this.allSelected = true;
        }
        if(length === 0) {
          this.allSelected = false;
        }
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.canisterBrandIdsControl.setValue(this.brands$.value.map(({ canisterBrandId }) => canisterBrandId))
    } else {
      this.canisterBrandIdsControl.setValue([])
    }
  }

  get canisterBrandIdsControl(): FormArray {
    return this.form.get('canisterBrandIds') as FormArray
  }

  get someSelected() {
    return this.canisterBrandIdsControl.value.length !== this.brands$.value.length &&
      this.canisterBrandIdsControl.value.length !== 0
  }

  addDepot() {
    let data = this.form.value;
    if (this.data?.depotId) {
      data = { ...data, id: this.data.depotId }
    }
    const service = this.data?.depotId ? this.depotService.updateDepot(data) : this.depotService.createDepot(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }
}

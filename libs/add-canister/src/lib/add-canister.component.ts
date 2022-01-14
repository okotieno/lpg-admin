import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICanister } from "@lpg/data";
import { of, tap } from "rxjs";
import { CanistersService } from "../../../canisters-service/src/lib/canisters.service";
import { CanisterBrandsService } from "@lpg/canister-brands-service";

@Component({
  selector: 'load-add-canister',
  templateUrl: './add-canister.component.html',
  styleUrls: ['./add-canister.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCanisterComponent implements OnInit {
  @Output() created = new EventEmitter();
  brands$ = this.canisterBrandService.brands$;
  form = this.fb.group({
    canisterBrandId: ['', [Validators.required]],
    canisterQR: ['', [Validators.required]],
    canisterSize: ['', [Validators.required]],
    canisterCode: ['', [Validators.required]],
    canisterManuf: ['', [Validators.required]],
    canisterManufDate: ['', [Validators.required]],
    canisterRFID: ['', [Validators.required]],
    canisterRecertification: ['', [Validators.required]],
  });
  canisterSizes$ = of([
    {canisterSizeId: '6', canisterSizeName: '6 Kg Cylinders'},
    {canisterSizeId: '13', canisterSizeName: '13 Kg Cylinders'}
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICanister,
    private dialog: MatDialog, private fb: FormBuilder,
    private canisterService: CanistersService,
    private canisterBrandService: CanisterBrandsService
  ) {
  }

  addCanister() {
    let data = this.form.value;
    if (this.data?.canisterId) {
      data = {...data, id: this.data.canisterId}
    }
    const service = this.data?.canisterId ? this.canisterService.updateCanister(data) : this.canisterService.createCanister(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }
}

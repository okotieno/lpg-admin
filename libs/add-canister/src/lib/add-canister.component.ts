import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICanister } from "@lpg/data";
import { of, tap } from "rxjs";
import { CanistersService } from "../../../canisters-service/src/lib/canisters.service";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { QrViewerComponent } from "../../../qr-viewer/src/lib/qr-viewer.component";

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
    canisterSize: ['', [Validators.required]],
    canisterCode: ['', [Validators.required]],
    canisterManuf: ['', [Validators.required]],
    canisterManufDate: ['', [Validators.required]],
    canisterRFID: ['', [Validators.required]],
    canisterRecertification: ['', [Validators.required]],
  });
  canisterSizes$ = of([
    {canisterSizeId: '6Kg', canisterSizeName: '6 Kg Cylinders'},
    {canisterSizeId: '13Kg', canisterSizeName: '13 Kg Cylinders'}
  ]);
  showScanner = false;

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
      tap(({ data }) => this.openQRDialog(data))
    ).subscribe()
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }

  scanSuccessHandler($event: string) {
    this.showScanner = false
    console.log(JSON.stringify(this.form.value))
    this.form.patchValue(JSON.parse($event));
  }

  openQRDialog(data: ICanister) {
    this.dialog.open(QrViewerComponent, {
      data,
      minWidth: '40vw',
      disableClose: true
    });
  }
}

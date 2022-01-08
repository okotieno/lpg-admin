import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { tap } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IBrand } from "@lpg/data";

@Component({
  selector: 'lpg-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  @Output() created = new EventEmitter();
  form = this.fb.group({
    brandName: ['', [Validators.required]],
    brandCompanyName: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IBrand,
    private dialog: MatDialog, private fb: FormBuilder, private brandService: CanisterBrandsService) {
  }

  addBrand() {
    let data = this.form.value;
    if (this.data?.brandId) {
      data = { ...data, id: this.data.brandId }
    }
    const service = this.data?.brandId ? this.brandService.updateBrand(data) : this.brandService.createBrand(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }

  ngOnInit() {
    if(this.data) {
      this.form.patchValue(this.data)
    }
  }
}

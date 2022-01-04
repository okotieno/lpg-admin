import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { tap } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

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
    @Inject(MAT_DIALOG_DATA) public data: { id: number, brandName: string, brandCompanyName: string; },
    private dialog: MatDialog, private fb: FormBuilder, private brandService: CanisterBrandsService) {
  }

  addBrand() {
    let data = this.form.value;
    if (this.data?.id) {
      data = { ...data, id: this.data.id }
    }
    const service = this.data?.id ? this.brandService.updateBrand(data) : this.brandService.createBrand(data);
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

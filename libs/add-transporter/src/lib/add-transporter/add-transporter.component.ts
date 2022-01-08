import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { tap } from "rxjs";
import { ITransporter } from "@lpg/data";
import { TransportersService } from "@lpg/transporters-service";

@Component({
  selector: 'lpg-add-transporter',
  templateUrl: './add-transporter.component.html',
  styleUrls: ['./add-transporter.component.scss']
})
export class AddTransporterComponent implements OnInit {
  @Output() created = new EventEmitter();
  form = this.fb.group({
    transporterName: ['', [Validators.required]],
    transporterCode: ['', [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITransporter,
    private dialog: MatDialog, private fb: FormBuilder, private transporterService: TransportersService) {
  }

  addTransporter() {
    let data = this.form.value;
    if (this.data?.transporterId) {
      data = {...data, id: this.data.transporterId}
    }
    const service = this.data?.transporterId ? this.transporterService.updateTransporter(data) : this.transporterService.createTransporter(data);
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

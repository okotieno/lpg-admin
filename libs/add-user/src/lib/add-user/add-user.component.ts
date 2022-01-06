import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { tap } from "rxjs";
import { UsersService } from "@lpg/users-service";
import { DepotsService } from "@lpg/depots-service";

@Component({
  selector: 'lpg-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  depots$ = this.depotService.depots$;
  @Output() created = new EventEmitter();
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.pattern("^[0-9]*$")]],

    depotAllocated: [false],
  });

  selectedDepotDataSource: any;
  displayedDepotColumns: string[] = ['select', 'depotName', 'userType'];
  addDepotToAllocateTo = false;
  currentDepotSelection?: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, brandName: string, brandCompanyName: string; },
    private dialog: MatDialog, private fb: FormBuilder, private userService: UsersService,
    private depotService: DepotsService
  ) {
  }

  get depotAllocatedControl() {
    return this.form.get('depotAllocated') as FormControl;
  }

  ngOnInit() {
    if(this.data) {
      this.form.patchValue(this.data)
    }
  }

  addUser() {
    let data = this.form.value;
    if (this.data?.id) {
      data = { ...data, id: this.data.id }
    }
    console.log(data)
    const service = this.data?.id ? this.userService.updateUser(data) : this.userService.createUser(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }
}

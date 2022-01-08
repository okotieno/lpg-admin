import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { shareReplay, tap } from "rxjs";
import { UsersService } from "@lpg/users-service";
import { DepotsService } from "@lpg/depots-service";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'lpg-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  depots$ = this.depotService.depots$.pipe(shareReplay());
  stationsTypes = [
    {name: 'dealer', stations: this.depots$},
    {name: 'depot', stations: this.depots$},
    {name: 'transporter', stations: this.depots$}
  ];
  @Output() created = new EventEmitter();
  @ViewChild(MatTable) table?: MatTable<any>;
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.pattern("^[0-9]*$")]],
    stationSpecificRoles: this.fb.array([this.generateStationSpecificRole()]),

    depotAllocated: [false],
  });

  selectedDepotDataSource: any;
  displayedDepotColumns: string[] = ['selectStationType', 'selectStationName'];
  addDepotToAllocateTo = false;
  currentDepotSelection?: number;
  stationSelection: string[] = [];
  stations: any[] = [];

  get stationSpecificRolesControl() {
    return this.form.get('stationSpecificRoles') as FormArray
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, brandName: string, brandCompanyName: string; },
    private dialog: MatDialog, private fb: FormBuilder, private userService: UsersService,
    private depotService: DepotsService,
    // private dealerService: Deale,
    private transportService: DepotsService,
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
      data = {...data, id: this.data.id}
    }
    console.log(data)
    const service = this.data?.id ? this.userService.updateUser(data) : this.userService.createUser(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
    ).subscribe()
  }

  addStationSpecificRole() {
    this.stationSpecificRolesControl.push(this.generateStationSpecificRole());
    (this.table as MatTable<any>).renderRows();
  }

  generateStationSpecificRole() {
    return this.fb.group({
      roleId: ['', [Validators.required]],
    });
  }

  stationChanged(selectedValue: string, i: number) {
    this.stations[i] = this.stationsTypes.find(({ name }) => selectedValue === name)?.stations ?? [];
    const control = this.stationSpecificRolesControl.controls[i] as FormGroup;
    this.stationsTypes.forEach(({name}) => {
      control.removeControl(`${name}Id`);
    });
    control.addControl(
      `${selectedValue}Id`,
      this.fb.control('', [Validators.required])
    );

  }
}

import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { shareReplay, take, tap } from "rxjs";
import { UsersService } from "@lpg/users-service";
import { DepotsService } from "@lpg/depots-service";
import { MatTable } from "@angular/material/table";
import { DealersService } from "@lpg/dealers-service";
import { TransportersService } from "@lpg/transporters-service";
import { MatSelectChange } from "@angular/material/select";
import { IUser } from "@lpg/data";

@Component({
  selector: 'lpg-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  depots$ = this.depotService.depots$.pipe(shareReplay());
  dealers$ = this.dealerService.dealers$.pipe(shareReplay());
  transporter$ = this.transportersService.transporters$.pipe(shareReplay());
  stationsTypes = [
    {name: 'dealer', stations: this.dealers$},
    {name: 'depot', stations: this.depots$},
    {name: 'transporter', stations: this.transporter$}
  ].map(type => ({...type, idName: `${type.name}Id`, apiLink: `${type.name}s`}));
  @Output() created = new EventEmitter();
  @ViewChild(MatTable) table?: MatTable<any>;
  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.pattern("^[0-9]*$")]],
    stationSpecificRoles: this.fb.array([]),
  });

  displayedDepotColumns: string[] = ['selectStationType', 'selectStationName', 'selectStationRole', 'actions'];
  addDepotToAllocateTo = false;
  stationSelection: string[] = [];
  stations: any[] = [];
  stationsRoles: any[] = [];

  get stationSpecificRolesControl() {
    return this.form.get('stationSpecificRoles') as FormArray
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private dialog: MatDialog, private fb: FormBuilder, private userService: UsersService,
    private depotService: DepotsService,
    private dealerService: DealersService,
    private transportersService: TransportersService,
  ) {
  }

  get depotAllocatedControl() {
    return this.form.get('depotAllocated') as FormControl;
  }

  ngOnInit() {

    if (this.data) {
      this.form.patchValue({...this.data, stationSpecificRoles: []})
      this.data.stationSpecificRoles.forEach(
        (role, index) => {
          this.addStationSpecificRole(index, role);

          const intersection = Object.keys(role).filter(element => this.stationsTypes.map(({idName}) => idName).includes(element));
          this.stations[index] = this.stationsTypes.find(({idName}) => intersection[0] === idName)?.stations ?? [];

          this.getStationRoles({value: role.dealerId ?? role.depotId ?? role.transporterId} as MatSelectChange, index)
        }
      );
    } else {
      this.addStationSpecificRole(0)
    }
  }

  addUser() {
    let data = this.form.value;
    if (this.data?.userId) {
      data = {...data, id: this.data.userId}
    }

    const service = this.data?.userId ? this.userService.updateUser(data) : this.userService.createUser(data);
    service.pipe(
      tap(() => this.created.emit(true)),
      tap(() => this.dialog.closeAll()),
      take(1)
    ).subscribe()
  }

  addStationSpecificRole(index: number, controlValue?: any) {

    this.stationSpecificRolesControl.push(this.generateStationSpecificRole(index, controlValue));

    if (this.table) {
      (this.table as MatTable<any>).renderRows();
    }
  }

  removeAllocation(i: number) {
    this.stationSpecificRolesControl.removeAt(i);
    this.stations.splice(i, 1);
    this.stationsRoles.splice(i, 1);
    this.stationSelection.splice(i, 1);
    (this.table as MatTable<any>).renderRows();
  }

  generateStationSpecificRole(index: number, controlValue?: { roleId: number, depotId: number, transporterId: number, dealerId: number }) {
    const control = this.fb.group({
      roleId: [controlValue?.roleId ?? '', [Validators.required]],
    });

    if (controlValue?.dealerId) {
      this.stationSelection[index] = 'dealer'
      control.addControl('dealerId', this.fb.control(controlValue.dealerId, [Validators.required]))
    }
    if (controlValue?.depotId) {
      this.stationSelection[index] = 'depot'
      control.addControl('depotId', this.fb.control(controlValue.depotId, [Validators.required]))
    }
    if (controlValue?.transporterId) {
      this.stationSelection[index] = 'transporter'
      control.addControl('transporterId', this.fb.control(controlValue.transporterId, [Validators.required]))
    }

    return control;
  }

  stationChanged(selectedValue: string, i: number) {
    this.stations[i] = this.stationsTypes.find(({name}) => selectedValue === name)?.stations ?? [];
    const control = this.stationSpecificRolesControl.controls[i] as FormGroup;

    this.stationsTypes.forEach(({name}) => {
      control.removeControl(`${name}Id`);
    });

    control.addControl(
      `${selectedValue}Id`,
      this.fb.control('', [Validators.required])
    );


  }

  getStationRoles($event: MatSelectChange, i: number) {
    let service = null;
    if (this.stationSelection[i] === 'depot') {
      service = this.depotService.getRoles({depotId: $event.value, page: 1, perPage: 100})
    } else if (this.stationSelection[i] === 'transporter') {
      service = this.transportersService.getRoles({transporterId: $event.value, page: 1, perPage: 100})
    } else if (this.stationSelection[i] === 'dealer') {
      service = this.dealerService.getRoles({dealerId: $event.value, page: 1, perPage: 100})
    }
    if (service) {
      service.pipe(
        tap(({data}) => {
          this.stationsRoles[i] = data
        }),
        take(1)
      )
        .subscribe()
    }
  }
}

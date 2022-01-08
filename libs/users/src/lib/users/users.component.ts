import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "../../../../add-user/src/lib/add-user/add-user.component";
import { UsersService } from "@lpg/users-service";
import { PageEvent } from "@angular/material/paginator";
import {
  DeleteConfirmationComponent
} from "../../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { IUser } from "@lpg/data";

@Component({
  selector: 'lpg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'phone', 'actions'];
  dataSource$ = new BehaviorSubject<IUser[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private dialog: MatDialog, private usersService: UsersService) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getUsers();
  }

  openAddUserDialog(data?: any) {
    const addUserDialog = this.dialog.open(AddUserComponent, {
      data,
      minWidth: '80vw',
      disableClose: true
    });

    addUserDialog.componentInstance.created.pipe(
      tap(() => this.getUsers()),
      take(1)
    ).subscribe()
  }

  getUsers() {
    return this.usersService.getUsers({perPage: this.perPage, page: this.page}).pipe(
      tap((res) => {
        this.dataSource$.next(res.data);
        this.meta = res.meta;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  openDeleteUserDialog(element: { id: number, username: string, email: string }) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {...element, title: 'depot'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.usersService.deleteUserWithId(element.id)),
      tap(() => this.getUsers()),
      take(1)
    ).subscribe()
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DealersService } from "@lpg/dealers-service";
import { PageEvent } from "@angular/material/paginator";
import { IDealer } from "@lpg/data";
import {
  DeleteConfirmationComponent
} from "../../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { AddDealerComponent } from "../../../../add-dealer/src/lib/add-dealer/add-dealer.component";

@Component({
  selector: 'lpg-dealer',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'dealerName', 'dealerCode', 'actions'];
  dataSource$ = new BehaviorSubject<IDealer[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = {total: 0};

  constructor(private dealerService: DealersService, private dialog: MatDialog) {
  }

  getDealers() {
    return this.dealerService.getDealers({perPage: this.perPage, page: this.page}).pipe(
      tap((res) => {
        this.dataSource$.next(res.data);
        this.meta = res.meta;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getDealers();
  }


  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  ngOnInit(): void {
    this.getDealers();
  }

  openDeleteDialog(element: IDealer) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.dealerId, name: element.dealerName, title: 'dealer'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.dealerService.deleteDealerWithId(element.dealerId)),
      tap(() => this.getDealers()),
      take(1)
    ).subscribe()
  }

  openAddDealerDialog(data?: any) {
    const addDealerDialog = this.dialog.open(AddDealerComponent, {
      data,
    });

    addDealerDialog.componentInstance.created.pipe(
      tap(() => this.getDealers()),
      take(1)
    ).subscribe()
  }

}

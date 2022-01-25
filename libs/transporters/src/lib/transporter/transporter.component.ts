import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TransportersService } from "@lpg/transporters-service";
import { PageEvent } from "@angular/material/paginator";
import { IBrand, ITransporter } from "@lpg/data";
import {
  DeleteConfirmationComponent
} from "../../../../delete-confirmation/src/lib/delete-confirmation.component";
import { AddTransporterComponent } from "../../../../add-transporter/src/lib/add-transporter/add-transporter.component";

@Component({
  selector: 'lpg-transporter',
  templateUrl: './transporter.component.html',
  styleUrls: ['./transporter.component.scss']
})
export class TransporterComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'transporterName', 'transporterCode', 'actions'];
  dataSource$ = new BehaviorSubject<any[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = {total: 0};

  constructor(private transporterService: TransportersService, private dialog: MatDialog) {
  }

  getTransporters() {
    return this.transporterService.getTransporters({perPage: this.perPage, page: this.page}).pipe(
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
    this.getTransporters();
  }


  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  ngOnInit(): void {
    this.getTransporters();
  }

  openDeleteDialog(element: ITransporter) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.transporterId, name: element.transporterName, title: 'transporter'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.transporterService.deleteTransporterWithId(element.transporterId)),
      tap(() => this.getTransporters()),
      take(1)
    ).subscribe()
  }

  openAddBrandDialog(data?: any) {
    const addTransporterDialog = this.dialog.open(AddTransporterComponent, {
      data,
    });

    addTransporterDialog.componentInstance.created.pipe(
      tap(() => this.getTransporters()),
      take(1)
    ).subscribe()
  }

}

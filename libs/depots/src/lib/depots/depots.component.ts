import { Component, OnDestroy, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DepotsService } from "@lpg/depots-service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import {
  DeleteConfirmationComponent
} from "../../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { AddDepotComponent } from "../../../../add-depot/src/lib/add-depot/add-depot.component";
import { IDepot } from "@lpg/data";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'lpg-depots',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DepotsComponent implements OnInit, OnDestroy {
  expandedElement: PeriodicElement | null = null;

  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'depotName', 'depotCode', 'depotEPRALicenceNo', 'depotLocation', 'actions'];
  dataSource$ = new BehaviorSubject<any[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private depotsService: DepotsService, private dialog: MatDialog) {

  }


  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getDepots();
  }

  getDepots() {
    return this.depotsService.getDepots({perPage: this.perPage, page: this.page}).pipe(
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
    this.getDepots();
  }

  openDeleteDialog(element: IDepot) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.depotId, name: element.depotName, title: 'depot'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.depotsService.deleteDepotWithId(element.depotId)),
      tap(() => this.getDepots()),
      take(1)
    ).subscribe()
  }

  openAddDepotDialog(data?: any) {
    const addDepotDialog = this.dialog.open(AddDepotComponent, {
      data,
      minWidth: '80vw',
      disableClose: true
    });

    addDepotDialog.componentInstance.created.pipe(
      tap(() => this.getDepots()),
      take(1)
    ).subscribe()
  }
}


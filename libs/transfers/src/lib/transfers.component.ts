import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DispatchesService } from "../../../dispatches-service/src/lib/dispatches.service";
import { BehaviorSubject, Subject, takeUntil, tap } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { ICanisterBatch } from "@lpg/data";

@Component({
  selector: 'lpg-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersComponent implements OnInit, OnDestroy {

  // dispatches$ = this.dispatchService.getBatches();
  destroyed$ = new Subject()
  displayedColumns: string[] = ['canisterBatchId', 'canisterQuantity', 'from' , 'to' , 'transportName', 'actions'];
  dataSource$ = new BehaviorSubject<ICanisterBatch[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = {total: 0};

  constructor(private dispatchService: DispatchesService) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getDepots();
  }

  getDepots() {
    return this.dispatchService.getBatches({perPage: this.perPage, page: this.page}).pipe(
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


  openEditBatchesDialog(element: any) {
    //
  }

  openDeleteDialog(element: any) {
    //
  }
}

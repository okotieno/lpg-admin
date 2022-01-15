import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ICanister } from "@lpg/data";
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import {
  DeleteConfirmationComponent
} from "../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { CanistersService } from "../../../canisters-service/src/lib/canisters.service";
import { AddCanisterComponent } from "../../../add-canister/src/lib/add-canister.component";
import { QrViewerModule } from "@lpg/qr-viewer";
import { QrViewerComponent } from "../../../qr-viewer/src/lib/qr-viewer.component";

@Component({
  selector: 'lpg-canisters',
  templateUrl: './canisters.component.html',
  styleUrls: ['./canisters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanistersComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject()
  displayedColumns: string[] = ['canisterId', 'canisterBrandName', 'canisterSize', 'actions'];
  dataSource$ = new BehaviorSubject<ICanister[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private canisterService: CanistersService, private dialog: MatDialog) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getCanisters();
  }

  getCanisters() {
    return this.canisterService.getCanisters({perPage: this.perPage, page: this.page}).pipe(
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
    this.getCanisters();
  }

  openDeleteDialog(element: ICanister) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.canisterId, name: element.canisterRFID, title: 'canister'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.canisterService.deleteCanisterWithId(element.canisterId)),
      tap(() => this.getCanisters()),
      take(1)
    ).subscribe()
  }

  openAddCanisterDialog(data?: any) {
    const addCanisterDialog = this.dialog.open(AddCanisterComponent, {
      data,
      minWidth: '80vw',
      disableClose: true
    });

    addCanisterDialog.componentInstance.created.pipe(
      tap(() => this.getCanisters()),
      take(1)
    ).subscribe()
  }

  openQRDialog(data: any) {
   this.dialog.open(QrViewerComponent, {
      data,
      minWidth: '40vw',
      disableClose: true
    });
  }
}

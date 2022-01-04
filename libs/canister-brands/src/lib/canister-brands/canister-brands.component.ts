import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import {
  DeleteConfirmationComponent
} from "../../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { AddBrandComponent } from "../../../../add-brand/src/lib/add-brand/add-brand.component";

@Component({
  selector: 'lpg-canister-brands',
  templateUrl: './canister-brands.component.html',
  styleUrls: ['./canister-brands.component.scss']
})
export class CanisterBrandsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'brandName', 'brandCompanyName', 'actions'];
  dataSource$ = new BehaviorSubject<any[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private brandService: CanisterBrandsService, private dialog: MatDialog) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getBrands();
  }

  getBrands() {
    return this.brandService.getBrands({perPage: this.perPage, page: this.page}).pipe(
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
    this.getBrands();
  }

  openDeleteDialog(element: { id: number, brandName: string }) {
    console.log({element})
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.id, name: element.brandName}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.brandService.deleteBrandWithId(element.id)),
      tap(() => this.getBrands()),
      take(1)
    ).subscribe()
  }

  openAddBrandDialog(data?: any) {
    const addBrandDialog = this.dialog.open(AddBrandComponent, {
      data,
    });

    addBrandDialog.componentInstance.created.pipe(
      tap(() => this.getBrands()),
      take(1)
    ).subscribe()
  }
}
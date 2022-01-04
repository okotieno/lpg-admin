import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanisterBrandsService } from "@lpg/canister-brands-service";
import { BehaviorSubject, Subject, takeUntil, tap } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'lpg-canister-brands',
  templateUrl: './canister-brands.component.html',
  styleUrls: ['./canister-brands.component.scss']
})
export class CanisterBrandsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject()
  displayedColumns: string[] = ['id', 'brandName', 'actions'];
  dataSource$ = new BehaviorSubject<any[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private brandService: CanisterBrandsService) {
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
}

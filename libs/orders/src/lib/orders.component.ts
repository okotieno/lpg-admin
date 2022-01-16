import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { IOrder } from "@lpg/data";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import {
  DeleteConfirmationComponent
} from "../../../delete-confirmation/src/lib/delete-confirmation/delete-confirmation.component";
import { AddOrderComponent } from "../../../add-order/src/lib/add-order.component";
import { OrdersService } from "../../../orders-service/src/lib/orders.service";

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject()
  displayedColumns: string[] = ['orderId', 'canisterSizeName', 'quantity', 'orderCompletionStatus', 'actions'];
  dataSource$ = new BehaviorSubject<IOrder[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = { total: 0 };

  constructor(private orderService: OrdersService, private dialog: MatDialog) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getOrders();
  }

  getOrders() {
    return this.orderService.getOrders({perPage: this.perPage, page: this.page}).pipe(
      tap((res) => {
        console.log({res});
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
    this.getOrders();
  }

  openDeleteDialog(element: IOrder) {
    const deleteDialog = this.dialog.open(DeleteConfirmationComponent, {
      data: {id: element.orderId, name: 'Canister', title: 'Order'}
    })
    deleteDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.orderService.deleteOrderWithId(element.orderId)),
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

  openAddOrderDialog(data?: IOrder) {
    const addOrderDialog = this.dialog.open(AddOrderComponent, {
      data,
    });

    addOrderDialog.componentInstance.created.pipe(
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

}

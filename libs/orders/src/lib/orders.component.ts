import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, take, takeUntil, tap } from "rxjs";
import { IOrder } from "@lpg/data";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { DeleteConfirmationComponent } from "@lpg/delete-confirmation";
import { AddOrderComponent } from "@lpg/add-order";
import { OrdersService } from "@lpg/orders-service";
import { AssignOrderComponent } from "@lpg/assign-order";
import { CanisterDispatchComponent } from "@lpg/canister-dispatch";
import { ActionConfirmationComponent } from "@lpg/action-confirmation";
import { OrderStatusService } from "@lpg/order-status-service";
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  CanisterDispatchConfirmationComponent
} from "@lpg/canister-dispatch-confirmation";

type ICanisterStationDirection =
  'depot->transporter'
  | 'transporter->dealer'
  | 'dealer->transporter'
  | 'transporter->depot'

type IStatusAction =
  'acknowledge' | 'assign' | 'depot-dispatch' | 'dealer-dispatch' | 'dealer-to-transporter-receive'
  | 'depot-to-transporter-receive' | 'dealer-receive' | 'depot-receive'

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject()
  displayedColumns: string[] = ['orderId', 'fromDepotName', 'toDealerName', 'canisterSizeName', 'orderCompletionStatus', 'actions'];
  dataSource$ = new BehaviorSubject<IOrder[]>([]);
  perPage = 10;
  page = 1;
  meta?: { total?: number } = {total: 0};
  expandedElement: any;
  currentStep?: IStatusAction;

  constructor(
    private orderService: OrdersService,
    private orderStatusService: OrderStatusService,
    private dialog: MatDialog
  ) {
  }

  setPage($event: PageEvent) {
    this.perPage = $event.pageSize;
    this.page = $event.pageIndex + 1;
    this.getOrders();
  }

  getOrders() {
    return this.orderService.getOrders({perPage: this.perPage, page: this.page}).pipe(
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
    ).subscribe();
  }

  openAddOrderDialog(data?: IOrder) {
    const addOrderDialog = this.dialog.open(AddOrderComponent, {
      data,
      minWidth: '80vw'
    });

    addOrderDialog.componentInstance.created.pipe(
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

  openAssignTransporterDialog(data: IOrder) {
    const assignOrderDialog = this.dialog.open(AssignOrderComponent, {
      data
    });
    assignOrderDialog.componentInstance.assigned.pipe(
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

  openDispatchDialog(data: IOrder, from: 'depot' | 'dealer' = 'depot') {
    const dispatchDialog = this.dialog.open(CanisterDispatchComponent, {
      data: {...data, from},
      minWidth: '80vw',
      maxWidth: '95vw',
      hasBackdrop: true,
      disableClose: true
    });
    dispatchDialog.componentInstance.assigned.pipe(
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

  openCanisterConfirmationDialog(element: IOrder, direction: ICanisterStationDirection) {
    const confirmDialog = this.dialog.open(CanisterDispatchConfirmationComponent, {
      data: {order: element, direction},
      minWidth: '50vw',
      hasBackdrop: true,
      disableClose: true,
    });
    confirmDialog.componentInstance.confirmed.pipe(
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()

  }

  openConfirmDialog(element: IOrder) {

    const data = {
      confirmationMessage: 'Please confirm acknowledgement of order ' + element.orderId
    };
    const confirmDialog = this.dialog.open(ActionConfirmationComponent, {
      data,
      hasBackdrop: true,
      disableClose: true,
    });
    confirmDialog.componentInstance.confirmed.pipe(
      switchMap(() => this.orderStatusService.acceptOrder({orderId: element.orderId})),
      tap(() => this.getOrders()),
      take(1)
    ).subscribe()
  }

  triggerAction(element: IOrder) {
    switch (this.currentStep) {
      case 'assign':
        this.openAssignTransporterDialog(element);
        break;
      case 'acknowledge':
        this.openConfirmDialog(element);
        break;
      case 'depot-dispatch':
        this.openDispatchDialog(element, 'depot');
        break;
      case 'dealer-dispatch':
        this.openDispatchDialog(element, 'dealer');
        break;
      case 'dealer-to-transporter-receive':
        this.openCanisterConfirmationDialog(element, 'dealer->transporter');
        break;
      case 'depot-receive':
        this.openCanisterConfirmationDialog(element, 'transporter->depot');
        break;
      case 'dealer-receive':
        this.openCanisterConfirmationDialog(element, 'transporter->dealer');
        break;
      case 'depot-to-transporter-receive':
        this.openCanisterConfirmationDialog(element, 'depot->transporter');
        break;
    }
  }
}

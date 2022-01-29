import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IOrder } from "@lpg/data";
import { OrderStatusService } from "@lpg/order-status-service";
import { take, tap } from "rxjs";

@Component({
  selector: 'lpg-canister-dispatch-confirmation',
  templateUrl: './canister-dispatch-confirmation.component.html',
  styleUrls: ['./canister-dispatch-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanisterDispatchConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { order: IOrder, direction: string },
    private orderStatusService: OrderStatusService
  ) {
  }

  confirmed = new EventEmitter<true>();
  confirmationStation: { [key: string]: { title: string, param: string } } = {
    ['depot->transporter']: {
      title: 'Transporter Receive (Depot) Confirmation',
      param: 'depotToTransporterOk'
    },
    ['transporter->dealer']: {
      title: 'Dealer Receive Confirmation',
      param: 'transporterToDealerOk'
    },
    ['dealer->transporter']: {
      title: 'Transporter Receive (Dealer) Confirmation',
      param: 'dealerToTransporterOk'
    },
    ['transporter->depot']: {
      title: 'Depot Receive Confirmation',
      param: 'transporterToDepotOk'
    }
  };

  confirmAction() {
    const params = {
      [this.confirmationStation[this.data.direction].param]: true
    }
    this.orderStatusService.confirmCanisterDispatch({
      orderId: this.data.order.orderId, params
    }).pipe(
      take(1),
      tap(() => this.confirmed.emit(true))
    ).subscribe()

  };

}

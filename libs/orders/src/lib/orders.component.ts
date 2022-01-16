import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

  constructor() {
  }

}

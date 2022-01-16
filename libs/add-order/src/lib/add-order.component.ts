import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrderComponent {
  @Output() created = new EventEmitter<true>();

}

import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'lpg-canister-dispatch-confirmation',
  templateUrl: './canister-dispatch-confirmation.component.html',
  styleUrls: ['./canister-dispatch-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanisterDispatchConfirmationComponent {
  confirmed = new EventEmitter(true);
}

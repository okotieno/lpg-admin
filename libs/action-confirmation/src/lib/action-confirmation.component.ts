import { Component, ChangeDetectionStrategy, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: './action-confirmation.component.html',
  styleUrls: ['./action-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionConfirmationComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      confirmationMessage: string
    }
  ) { }

}

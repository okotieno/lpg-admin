import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'lpg-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  idConfirmation = '#';
  @Output() confirmed = new EventEmitter();


  constructor(
    private modalService: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number, name: string, title: string;
    }) {
  }

  onNoClick() {
    this.modalService.closeAll();
  }

  confirmAction() {
    this.confirmed.emit(true);
    this.modalService.closeAll();
  }
}

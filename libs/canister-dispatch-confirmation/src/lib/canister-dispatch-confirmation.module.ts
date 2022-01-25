import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanisterDispatchConfirmationComponent } from './canister-dispatch-confirmation.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
  declarations: [
    CanisterDispatchConfirmationComponent
  ],
  exports: [
    CanisterDispatchConfirmationComponent
  ],
})
export class CanisterDispatchConfirmationModule {}

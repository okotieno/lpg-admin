import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmationComponent } from './action-confirmation.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    A11yModule
  ],
  declarations: [
    ActionConfirmationComponent
  ],
  exports: [
    ActionConfirmationComponent
  ],
})
export class ActionConfirmationModule {}

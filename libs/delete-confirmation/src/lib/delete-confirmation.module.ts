import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    A11yModule,
    FormsModule
  ],
  declarations: [
    DeleteConfirmationComponent
  ],
})
export class DeleteConfirmationModule {}

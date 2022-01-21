import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignOrderComponent } from './assign-order.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    A11yModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [
    AssignOrderComponent
  ],
  exports: [
    AssignOrderComponent
  ]
})
export class AssignOrderModule {}

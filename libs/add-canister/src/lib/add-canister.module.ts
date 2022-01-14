import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCanisterComponent } from './add-canister.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  declarations: [
    AddCanisterComponent
  ],
  exports: [
    AddCanisterComponent
  ],
})
export class AddCanisterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepotComponent } from './add-depot/add-depot.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, FormsModule, MatDialogModule, MatIconModule],
  declarations: [
    AddDepotComponent
  ],
})
export class AddDepotModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepotComponent } from './add-depot/add-depot.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  declarations: [
    AddDepotComponent
  ],
})
export class AddDepotModule {}

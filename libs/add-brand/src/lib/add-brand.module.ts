import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  declarations: [
    AddBrandComponent
  ],
})
export class AddBrandModule {}

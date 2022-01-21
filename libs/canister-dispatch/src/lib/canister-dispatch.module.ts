import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanisterDispatchComponent } from './canister-dispatch.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, FormsModule],
  declarations: [
    CanisterDispatchComponent
  ],
  exports: [
    CanisterDispatchComponent
  ],
})
export class CanisterDispatchModule {}

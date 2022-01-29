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
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule, ReactiveFormsModule, MatSelectModule, MatSlideToggleModule, FormsModule, MatTableModule, MatTooltipModule, MatInputModule],
  declarations: [
    CanisterDispatchComponent
  ],
  exports: [
    CanisterDispatchComponent
  ],
})
export class CanisterDispatchModule {}

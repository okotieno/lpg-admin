import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ErrorsModule } from "@lpg/errors";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ErrorsModule
  ],
  declarations: [
    AddDealerComponent
  ],
})
export class AddDealerModule {
}

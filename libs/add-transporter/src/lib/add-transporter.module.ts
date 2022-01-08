import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTransporterComponent } from './add-transporter/add-transporter.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ErrorsModule } from "@lpg/errors";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ErrorsModule
  ],
  declarations: [
    AddTransporterComponent,

  ],
})
export class AddTransporterModule {
}

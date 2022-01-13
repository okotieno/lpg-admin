import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OtpFlowComponent } from './otp-flow.component';
import { OtpInputModule } from "@lpg/otp-input";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: OtpFlowComponent}
    ]),
    OtpInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [
    OtpFlowComponent
  ],
})
export class OtpFlowModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp-input.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    OtpInputComponent
  ],
  exports: [
    OtpInputComponent
  ],
})
export class OtpInputModule {
}

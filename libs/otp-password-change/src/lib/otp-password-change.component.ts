import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  templateUrl: './otp-password-change.component.html',
  styleUrls: ['./otp-password-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpPasswordChangeComponent {

  form = this.fb.group({
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) { }

  submit () {

  }
}

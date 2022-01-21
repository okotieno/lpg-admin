import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../authentication-service/src/lib/authentication.service";
import { take, tap } from "rxjs";

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
  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }
  clearForm() {
    // this.form.setValue({password: '', passwordConfirmation: ''});
    this.form.reset();
    this.form.get('password')?.setErrors(null);
    this.form.get('passwordConfirmation')?.setErrors(null);
  }
  submit () {
    this.authService.passwordChange(this.form.value).pipe(
      tap(() => this.clearForm()),
      take(1)
    ).subscribe();
  }
}

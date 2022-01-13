import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../login/src/lib/services/authentication.service";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Component({
  selector: 'lpg-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  submit() {
    this.authenticationService.resetPassword(this.form.value).pipe(
      tap(({data}) =>
        this.router.navigate(['/forgot-password/otp'], {state: data}))
    ).subscribe()
  }
}

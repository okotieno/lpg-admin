import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../login/src/lib/services/authentication.service";
import { tap } from "rxjs";

@Component({
  selector: 'lpg-otp-flow',
  templateUrl: './otp-flow.component.html',
  styleUrls: ['./otp-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpFlowComponent {
  form = this.fb.group({
    token: ['', [Validators.required]
    ],
  });
  private readonly otpDetails: { [p: string]: any } | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.otpDetails = this.router.getCurrentNavigation()?.extras?.state
    if (!this.otpDetails?.['identifier']) {
      this.router.navigate(['../'], {relativeTo: this.route})
    }
  }

  submit = () => {
    this.authService.confirmPasswordResetOtp({...this.form.value, ...this.otpDetails})
      .pipe(
        tap(() => this.router.navigate(['/settings', 'otp-password-change']))
      )
      .subscribe()
  };
}

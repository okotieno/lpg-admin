import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "@lpg/authentication-service";
import { Router } from "@angular/router";
import { tap } from "rxjs";

@Component({
  selector: 'lpg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  submit() {
    this.authenticationService.login(this.form.value).pipe(
      tap(() => this.router.navigate(['/dashboard']))
    ).subscribe()
  }
}

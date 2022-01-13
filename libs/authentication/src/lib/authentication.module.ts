import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        component: AuthenticationComponent,
        path: 'login',
        loadChildren: () => import('@lpg/login').then(m => m.LoginModule)
      },
      {
        component: AuthenticationComponent,
        path: 'forgot-password',
        loadChildren: () => import('@lpg/forgot-password').then(m => m.ForgotPasswordModule)
      }
    ]),
    MatGridListModule,
  ],
  declarations: [
    AuthenticationComponent
  ],
})
export class AuthenticationModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthGuard } from "@lpg/auth-guard";
import { GuestGuard } from "@lpg/guest-guard";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: () => import('@lpg/login').then(m => m.LoginModule),
        canActivate: [GuestGuard],
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/dashboard').then(m => m.DashboardModule)
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

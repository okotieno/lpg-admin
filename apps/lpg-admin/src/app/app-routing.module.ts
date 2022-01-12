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
      },
      {
        path: 'depots',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/depots').then(m => m.DepotsModule)
      },
      {
        path: 'transporters',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/transporters').then(m => m.TransportersModule)
      },
      {
        path: 'brands',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/canister-brands').then(m => m.CanisterBrandsModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/users').then(m => m.UsersModule)
      },
      {
        path: 'dealers',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/dealers').then(m => m.DealersModule)
      },
      {
        path: 'transfers',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/transfers').then(m => m.TransfersModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('@lpg/profile').then(m => m.ProfileModule)
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: () => import('@lpg/login').then(m => m.LoginModule)
      },
      {
        path: '',
        loadChildren: () => import('@lpg/login').then(m => m.LoginModule)
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

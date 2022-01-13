import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { LayoutModule } from "@lpg/layout";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: SettingsComponent},
      {
        path: 'otp-password-change',
        loadChildren: () => import('@lpg/otp-password-change').then(m => m.OtpPasswordChangeModule)
      }
    ]),
    LayoutModule
  ],
  declarations: [
    SettingsComponent
  ],
})
export class SettingsModule {
}

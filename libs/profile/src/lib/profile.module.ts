import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { LayoutModule } from "@lpg/layout";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ProfileComponent}
    ]),
    LayoutModule,
    MatSlideToggleModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule {}

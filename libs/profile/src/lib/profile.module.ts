import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { LayoutModule } from "@lpg/layout";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";
import { ProfileStoreModule } from "@lpg/profile-store";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ProfileComponent}
    ]),
    LayoutModule,
    MatSlideToggleModule,
    FormsModule,
    ProfileStoreModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule {}

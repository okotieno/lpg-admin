import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { ERROR_FEATURE_KEY, reducer } from "./store/reducer";
import { PageErrorComponent } from './page-error/page-error.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormErrorComponent } from './form-error/form-error.component';
import { MatListModule } from "@angular/material/list";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ERROR_FEATURE_KEY, reducer),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  declarations: [
    PageErrorComponent,
    FormErrorComponent
  ],
  exports: [
    PageErrorComponent,
    FormErrorComponent
  ]
})
export class ErrorsModule {}

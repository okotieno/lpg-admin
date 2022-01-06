import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { ERROR_FEATURE_KEY, reducer } from "./store/reducer";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { PageErrorComponent } from './page-error/page-error.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ERROR_FEATURE_KEY, reducer),
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  declarations: [
    PageErrorComponent
  ],
  exports: [
    PageErrorComponent
  ]
})
export class ErrorsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { ERROR_FEATURE_KEY, reducer } from "./store/reducer";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./interceptors/error.interceptor";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ERROR_FEATURE_KEY, reducer)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class ErrorsModule {}

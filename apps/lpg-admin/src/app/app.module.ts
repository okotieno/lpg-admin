import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { APIInterceptor } from "./interceptors/api.interceptor";
import { LoadingInterceptor, LoadingModule } from "@lpg/loading";
import { ErrorsModule } from "@lpg/errors";
import { ErrorInterceptor } from "@lpg/errors";
import { ThemeStoreModule } from "@lpg/theme-store";
import {
  MessageAlertsInterceptor
} from "@lpg/message-alerts";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    LoadingModule,
    ErrorsModule,
    ThemeStoreModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: 'apiUrl', useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: MessageAlertsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

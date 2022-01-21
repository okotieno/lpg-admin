import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorFacade } from "../store/facade";
import { AuthenticationService } from "@lpg/authentication-service";

export interface MessageInterface {
  type?: string;
  message: string;
  status?: number | undefined;
  help?: string | undefined;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorFacade: ErrorFacade, private authenticationService: AuthenticationService) {
  }
  private message: MessageInterface | undefined;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: any) => {
      let helperMessage: string;
      console.log(err)
      if (typeof err.error === 'string') {
        helperMessage = err.error;
      } else if (typeof err.message === 'string') {
        helperMessage = err.message;
      } else {
        helperMessage = err.error.message;
      }
      const error = err.statusText || err.error.message;
      if (err.status === 0) {
        this.message = {
          message: err.statusText,
          type: 'error',
          status: err.status,
          help: helperMessage
        };
      }
      if (err.status === 500) {

        this.message = {
          message: err.statusText,
          type: 'error',
          status: err.status,
          help:  helperMessage
        };
      }
      if (err.status === 422) {
        this.message = {
          message: err.statusText + ': ' + err.error.message,
          type: 'error',
          status: err.status,
          help: Object.values(err.error.errors).join(', ')
        };
        this.errorFacade.loadFormErrors(err.error.errors)
      }
      if (err.status === 404) {
        this.message = {
          message: err.statusText,
          type: 'error',
          status: err.status,
          help: 'The URl "' + err.url + '" is invalid, If this is an error kindly contact the admin'
        };
      }
      if (err.status === 403) {
        this.message = {
          message: err.statusText + ': ' + err.error.message,
          type: 'error',
          status: err.status,
          help: err.message
        };
      }
      if (err.status === 401) {
        this.message = {
          message: error,
          type: 'error',
          status: err.status,
          help: err.error.message
        };
        this.authenticationService.clearStorage();
      }
      if (err.status === 400 || err.status === 405 || err.status === 409) {
        this.message = {
          message: error,
          type: 'error',
          status: err.status,
          help: err.error.message
        };
      }
      this.errorFacade.loadPageErrors(this.message);
      return throwError(() => new Error(this.message?.message));
    }));
  }
}

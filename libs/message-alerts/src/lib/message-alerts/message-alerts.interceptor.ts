import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MessageAlertsInterceptor implements HttpInterceptor {

  constructor(private snackbar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.body) {
          if (event.body.headers && event.body.headers.message) {
            this.snackbar.open(
              event.body.headers.message, 'close', {
                duration: 5000,
                verticalPosition: "top",
                horizontalPosition: "right"
            });
          }
        }
      })
    );
  }
}

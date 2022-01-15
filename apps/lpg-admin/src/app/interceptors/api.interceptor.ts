import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    @Inject('apiUrl') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = /^http[s]*:\/\//.test(request.url) ? request.url : `${this.baseUrl}/${request.url}`;

    if(/assets\/icons/.test(url)) {
      return next.handle(request);
    }
    const apiReq = request.clone({url});
    return next.handle(apiReq);
  }
}

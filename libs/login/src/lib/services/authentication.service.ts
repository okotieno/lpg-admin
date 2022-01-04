import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../../../apps/lpg-admin/src/environments/environment";
import { IOauth, IResponse, IUser } from "@lpg/data";

const PASSPORT_CLIENT = environment.passportClient;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  currentUser = this.currentUserSubject.asObservable();
  localStorageUser = JSON.parse(String(localStorage.getItem('currentUser')));
  sessionStorageUser = JSON.parse(String(sessionStorage.getItem('currentUser')));
  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  revokeToken: Observable<any> = this.http.get('users/auth/logout');

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(!!this.authorizationToken);
  }

  get authorizationToken(): string | undefined {

    console.log(this.sessionStorageUser);
    if (this.sessionStorageUser) {
      return `Bearer ${this.sessionStorageUser.access_token}`;
    }
    if (this.localStorageUser) {
      return `Bearer ${this.localStorageUser.access_token}`;
    }
    return;
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  public get currentUserProfile$(): Observable<IUser> {
    if (!this.isLoggedInSubject.value) {
      return EMPTY;
    }

    return this.http.get<IResponse<IUser>>('users/auth').pipe(
      map(({data}) => data),
      catchError(error => {
        if (error.status === 401) {
          this.clearStorage();
        }
        return throwError(error);
      }));
  }


  changePassword(data: { oldPassword: string, newPassword: string; newPasswordConfirmation: string; token: string }) {
    return this.http.post<IResponse<any>>('password/reset', data);
  }


  resetPassword(email: { email: string }) {
    return this.http.post('password/email', email);
  }

  login(data: { username: string; password: string; rememberMe: boolean }): Observable<any> {
    const {username, password, rememberMe} = data;
    const loginData: IOauth = {
      ['grant_type']: PASSPORT_CLIENT.grantType,
      ['client_id']: PASSPORT_CLIENT.clientId,
      ['client_secret']: PASSPORT_CLIENT.clientSecret,
      username,
      password,
      scope: '',
    };
    const url = `oauth/token`;

    return this.http.post<any>(url, loginData).pipe(
      tap(user => rememberMe ? localStorage.setItem('currentUser', JSON.stringify(user)) : ''),
      tap(user => !rememberMe ? sessionStorage.setItem('currentUser', JSON.stringify(user)) : ''),
      tap(user => this.currentUserSubject.next(user)),
      tap(() => this.isLoggedInSubject.next(true)),
      catchError(error => throwError(error))
    );
  }

  clearStorage = () => {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  };

  logout(): Observable<any> {
    if (!this.isLoggedInSubject.value) {
      return EMPTY;
    }
    return this.revokeToken.pipe(
      catchError(() => EMPTY),
      tap(this.clearStorage)
    );
  }
}

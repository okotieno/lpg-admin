import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../../../authentication-service/src/lib/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.isLoggedInSubject.value;

    if(!currentUser) {
      return true;
    }
    this.router.navigate(['/dashboard']).then();
    return false;
  }
}

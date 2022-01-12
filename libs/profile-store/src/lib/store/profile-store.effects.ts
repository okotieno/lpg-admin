import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ProfileStoreActions from './profile-store.actions';
import { AuthenticationService } from "../../../../login/src/lib/services/authentication.service";
import { map, switchMap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProfileStoreEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileStoreActions.init),
      switchMap(() => this.authenticationService.getLoggedInUser()),
      map((res) => ProfileStoreActions.loadProfileStoreSuccess({data: res}))
    )
  );

  clear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileStoreActions.clear),
      switchMap(() => this.authenticationService.logout()),
      switchMap(() => this.router.navigate(['/login'])),
      map(() => ProfileStoreActions.clearProfileStore())
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {}
}

import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { DrawerFacade } from "@lpg/layout";
import { ThemeFacade } from "../../../layout/src/lib/state/theme/theme.facade";
import { ProfileStoreFacade } from "../../../profile-store/src/lib/store/profile-store.facade";
import { IUser } from "@lpg/data";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  darkMode$ = this.themeFacade.darkMode$;
  darkMode = false;
  profile$: Observable<IUser> = this.profileFacade.myProfile$;
  private destroyed$ = new Subject();
  constructor(
    private drawerFacade: DrawerFacade,
    private themeFacade: ThemeFacade,
    private profileFacade: ProfileStoreFacade
    ) {
    this.profileFacade.init();
  }


  ngOnInit() {
    this.darkMode$.subscribe({
      next: (res) => this.darkMode = res
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
  }

  changeTheme() {
    this.themeFacade.toggleDarkMode();
  }

}

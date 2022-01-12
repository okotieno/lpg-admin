import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { DrawerFacade } from "@lpg/layout";
import { ThemeFacade } from "../../../layout/src/lib/state/theme/theme.facade";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  darkMode$ = this.themeFacade.darkMode$;
  darkMode = false;
  private destroyed$ = new Subject();
  constructor(private drawerFacade: DrawerFacade, private themeFacade: ThemeFacade) {
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

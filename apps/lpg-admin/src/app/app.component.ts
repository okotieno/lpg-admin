import { Component } from '@angular/core';
import { ThemeFacade } from "../../../../libs/layout/src/lib/state/theme/theme.facade";
import { tap } from "rxjs";

@Component({
  selector: 'lpg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lpg-admin';
  darkMode$ = this.themeFacade.darkMode$.pipe(
    tap((res) => {
      if (res) {
        document.querySelector("body")?.classList.add('theme-alternate')
      } else {
        document.querySelector("body")?.classList.remove('theme-alternate')
      }
    })
  );
  constructor(private themeFacade: ThemeFacade) {
  }
}

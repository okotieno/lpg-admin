import { Component } from '@angular/core';
import { tap } from "rxjs";
import { ThemeFacade } from "../../../../libs/theme-store/src/lib/store/theme/theme.facade";

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

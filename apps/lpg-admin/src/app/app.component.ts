import { Component } from '@angular/core';
import { ThemeFacade } from "../../../../libs/layout/src/lib/state/theme/theme.facade";

@Component({
  selector: 'lpg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lpg-admin';
  darkMode$ = this.themeFacade.darkMode$;
  constructor(private themeFacade: ThemeFacade) {
  }
}

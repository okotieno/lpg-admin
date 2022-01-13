import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { getDarkMode } from "./theme.selectors";
import { themeToggle } from "./theme.actions";

@Injectable({
  providedIn: 'root'
})
export class ThemeFacade {

  constructor(private store: Store) { }

  darkMode$ = this.store.select(getDarkMode);

  toggleDarkMode() {
    this.store.dispatch(themeToggle());
  }
}

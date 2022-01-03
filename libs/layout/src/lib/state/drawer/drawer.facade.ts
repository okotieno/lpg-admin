import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { getDrawerMini, getDrawerOpen, getShowDrawerHeader } from "./drawer.selectors";
import { drawerToggle, drawerHideMini } from "./drawer.actions";

@Injectable({
  providedIn: 'root'
})
export class DrawerFacade {

  constructor(private store: Store) { }

  open$ = this.store.select(getDrawerOpen);
  mini$ = this.store.select(getDrawerMini);
  showHeaderMenuButton$ = this.store.select(getShowDrawerHeader);

  toggleOpen() {
    this.store.dispatch(drawerToggle());
  }

  hideMini() {
    this.store.dispatch(drawerHideMini());
  }
}

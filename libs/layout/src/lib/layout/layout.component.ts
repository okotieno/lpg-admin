import { Component } from '@angular/core';
import { DrawerFacade } from '../state/drawer/drawer.facade';

@Component({
  selector: 'lpg-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  drawerOpen$ = this.drawerFacade.open$;
  drawerMini$ = this.drawerFacade.mini$;

  constructor(private drawerFacade: DrawerFacade) {
  }

  public toggleMenu() {
    this.drawerFacade.toggleOpen();
  }

}

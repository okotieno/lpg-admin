import { Component, OnInit } from '@angular/core';
import { DrawerFacade } from "@lpg/layout";

@Component({
  selector: 'lpg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showHeaderMenuButton$ = this.drawerFacade.showHeaderMenuButton$;
  drawerOpen$ = this.drawerFacade.open$;
  drawerMini$ = this.drawerFacade.mini$;
  constructor(private drawerFacade: DrawerFacade) {
  }

  public toggleMenu() {
    this.drawerFacade.toggleOpen();
  }


}

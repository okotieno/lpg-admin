import { Component } from '@angular/core';
import { DrawerFacade } from "@lpg/layout";

@Component({
  selector: 'lpg-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private drawerFacade: DrawerFacade) {
  }

  isOpen$ = this.drawerFacade.open$;
  isMini$ = this.drawerFacade.mini$;

  public routeLinks = [
    {link: "about", name: "About", icon: "dashboard"},
    {link: "locations", name: "Locations", icon: "account_balance"},
  ];


  hideMini() {
    this.drawerFacade.hideMini();
  }

  toggleMenu() {
    this.drawerFacade.toggleOpen();
  }
}

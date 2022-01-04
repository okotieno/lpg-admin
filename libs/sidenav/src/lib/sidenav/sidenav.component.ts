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

  public routeLinks = [
    {link: ["/users"], name: "Users Management", icon: "dashboard"},
    {link: ["/brands"], name: "Canister Brands Management", icon: "account_balance"},
    {link: ["/depots"], name: "Depots Management", icon: "account_balance"},
  ];


  hideMini() {
    this.drawerFacade.hideMini();
  }

  toggleMenu() {
    this.drawerFacade.toggleOpen();
  }
}

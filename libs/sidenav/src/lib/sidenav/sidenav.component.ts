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
    {link: ["/"], name: "Home", icon: "home"},
    {link: ["/users"], name: "Users Management", icon: "people_alt"},
    {link: ["/brands"], name: "Canister Brands Management", icon: "branding_watermark"},
    {link: ["/depots"], name: "Depots Management", icon: "warehouse"},
    {link: ["/transporters"], name: "Transporters Management", icon: "local_shipping"},
    {link: ["/dealers"], name: "Dealers Management", icon: "storefront"},
  ];


  hideMini() {
    this.drawerFacade.hideMini();
  }

  toggleMenu() {
    this.drawerFacade.toggleOpen();
  }
}

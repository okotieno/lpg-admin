import { Component } from '@angular/core';
import { DrawerFacade } from "@lpg/layout";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'lpg-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  isOpen$ = this.drawerFacade.open$;

  public routeLinks = [
    {link: ["/dashboard"], name: "Home", icon: "home"},
    {link: ["/canisters"], name: "Canisters Management", svgIcon: "mdi.gas-cylinder"},
    {link: ["/users"], name: "Users Management", icon: "people_alt"},
    {link: ["/brands"], name: "Canister Brands Management", icon: "branding_watermark"},
    {link: ["/depots"], name: "Depots Management", icon: "warehouse"},
    {link: ["/transporters"], name: "Transporters Management", icon: "local_shipping"},
    {link: ["/dealers"], name: "Dealers Management", icon: "storefront"},
    {link: ["/transfers"], name: "Transfers", icon: "transfer_within_a_station"},
    {link: ["/settings"], name: "Settings", icon: "settings"},
  ];


  hideMini() {
    this.drawerFacade.hideMini();
  }

  toggleMenu() {
    this.drawerFacade.toggleOpen();
  }

  constructor(private drawerFacade: DrawerFacade, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `mdi.gas-cylinder`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/mdi.gas-cylinder.svg")
    );
  }
}

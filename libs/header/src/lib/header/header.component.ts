import { Component } from '@angular/core';
import { DrawerFacade } from "@lpg/layout";
import { Observable, take } from "rxjs";
import { IUser } from "@lpg/data";
import { ProfileStoreFacade } from "../../../../profile-store/src/lib/store/profile-store.facade";
import { AuthenticationService } from "../../../../login/src/lib/services/authentication.service";

@Component({
  selector: 'lpg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showHeaderMenuButton$ = this.drawerFacade.showHeaderMenuButton$;
  drawerOpen$ = this.drawerFacade.open$;
  drawerMini$ = this.drawerFacade.mini$;
  profile$: Observable<IUser> = this.profileFacade.myProfile$;

  constructor(
    private drawerFacade: DrawerFacade,
    private profileFacade: ProfileStoreFacade,
    private authenticationService: AuthenticationService
  ) {
    this.profileFacade.init();
  }

  public toggleMenu() {
    this.drawerFacade.toggleOpen();
  }


  logout() {
    this.profileFacade.clear();
  }
}

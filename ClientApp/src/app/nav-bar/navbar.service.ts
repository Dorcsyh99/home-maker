import { Injectable } from "@angular/core";
import { NavBarComponent } from "./nav-bar.component";


@Injectable({ providedIn: "root"})
export class NavbarService {

  private navbarType!: string;

  constructor(private navbarComp: NavBarComponent){}

  setLoggedIn(value: boolean) {
    this.navbarComp.setIsLoggedIn(value);

  }

}

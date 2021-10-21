import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', './nav-bar.resp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({ providedIn: "root"})
export class NavBarComponent implements OnInit {

  private isLoggedIn: boolean = this.authservice.getIsAuthenticated();

  constructor(public authservice: AuthService) {
  }

  ngOnInit(): void {

  }

  public getIsLoggedIn(){
    console.log(this.authservice.getIsAuthenticated());
    return this.authservice.getIsAuthenticated();
  }

  public setIsLoggedIn(value: boolean){
    this.authservice.setIsLoggedIn(value);
  }

  logOut(){
    this.setIsLoggedIn(false);
    this.authservice.logout();
  }


}

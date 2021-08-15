import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', './nav-bar.resp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({ providedIn: "root"})
export class NavBarComponent implements OnInit {

  isLoggedIn = this.authservice.getIsAuth();

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

  }

  isAuthenticated: boolean = this.authservice.getIsAuth();

  logOut(){
    this.authservice.logout();
  }


}

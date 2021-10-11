import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HomeService } from 'src/app/homes/home.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  //gettereket csinalni és privatta tenni ezeket
  public user = localStorage.getItem("userName");
  public id = localStorage.getItem("userId");
  public token = localStorage.getItem('token');
  public avatar = localStorage.getItem("userAvatar");
  public firstName = localStorage.getItem("userFirstName");
  public lastName = localStorage.getItem("userLastName");


  constructor(private authService: AuthService, private homeService: HomeService) {

  }

  ngOnInit() {
  }

  getUsersHomes(){

  }

}

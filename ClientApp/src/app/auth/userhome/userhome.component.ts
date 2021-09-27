import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoggedInUser } from '../auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  public user = localStorage.getItem("userName");
  public id = localStorage.getItem("userId");
  public userData!: LoggedInUser;
  public token = localStorage.getItem('token');
  public avatar!: string;


  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    console.log("token on userhome: ", this.token);
    this.authService.getUser(this.token as string, this.id as string).subscribe(user => {
      this.userData = {
        email: user.email,
        avatar: user.avatar
      }
      console.log(this.userData);
    });
    this.fetchAvatar(this.id as string);
    console.log("avatar on frontend: ", this.avatar);
  }


  fetchAvatar(userId: string){
    console.log("entered hereeee");
    let avatar = this.authService.fetchAvatar(userId);
    console.log(avatar);
  }

}

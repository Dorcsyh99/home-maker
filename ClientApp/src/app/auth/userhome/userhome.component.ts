import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HomeService } from 'src/app/homes/home.service';
import { SearchService } from 'src/app/search/search.service';
import { Home } from 'src/app/homes/home.model';
import { first } from 'rxjs/operators';

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

  public homes: Home[] = [];

  constructor(private authService: AuthService, private homeService: HomeService, private searchService: SearchService) {
    
  }

  ngOnInit() {
    this.searchService.getHomesFromUser(this.id as string)
    .pipe(first())
    .subscribe(homes => {
      this.homes = homes;
      console.log(this.homes[0]);
      console.log(this.homes[0]._id);
    });
  }

  getUsersHomes(){
    return this.homes;
  }

}

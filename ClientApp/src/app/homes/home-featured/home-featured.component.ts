import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Home } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-featured',
  templateUrl: './home-featured.component.html',
  styleUrls: ['./home-featured.component.scss']
})
export class HomeFeaturedComponent implements OnInit {

  constructor(private homeService: HomeService, private httpClient: HttpClient) { }

  homes: any = [];

  ngOnInit(): void {
    this.getFeaturedHomes();
  }

  getFeaturedHomes(){
    return this.homeService.getFeaturedHomes().subscribe(res => {
      this.homes = res;
      console.log(this.homes);
    });
  }

}

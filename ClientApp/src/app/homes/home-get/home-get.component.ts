import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Home } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-get',
  templateUrl: './home-get.component.html',
  styleUrls: ['./home-get.component.scss']
})
export class HomeGetComponent implements OnInit {

  home: Home = {
    image: []
  };
  isLoadingResult = true;

  constructor(private homeService: HomeService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getHome(this.route.snapshot.params.id);
  }

  getHome(id: string) {
    this.homeService.read(id)
    .subscribe((home: any) => {
      this.home = home;
      console.log(this.home);
      this.isLoadingResult = false;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Home } from '../home.model';
import { HomeService } from '../home.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home-all',
  templateUrl: './home-all.component.html',
  styleUrls: ['./home-all.component.scss']
})
export class HomeAllComponent implements OnInit {

  homes: Home[] = [];
  currentHome: Home = {};
  currentIndex = -1;
  city: string = '';

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.readAll()
    .pipe(first())
    .subscribe(homes => {
      this.homes = homes;
      console.log(this.homes[0]);
      console.log(this.homes[0]._id);
    });
  }





}

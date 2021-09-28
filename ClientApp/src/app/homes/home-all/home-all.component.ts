import { Component, OnInit } from '@angular/core';
import { Home } from '../home.model';
import { HomeService } from '../home.service';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

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

  searchForm = new FormGroup({
    city: new FormControl(''), //text
    city2: new FormControl(''), //text
    roomsMin: new FormControl(''), //number
    roomsMax: new FormControl(''), //number
    sizeMin: new FormControl(''), //csuszka
    sizeMAx: new FormControl(''), //csuszka
    priceMin: new FormControl(''), //csuszka
    priceMax: new FormControl(''), //csuszka
    condition: new FormControl(''), //select
    type: new FormControl(''), //radio vagy select
    heating: new FormControl(''), //select
    elevator: new FormControl(''), 
    garden: new FormControl(''),
    pet: new FormControl(''),
    smoke: new FormControl(''),
    parking: new FormControl(''), //select
    attic: new FormControl('')
  })

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

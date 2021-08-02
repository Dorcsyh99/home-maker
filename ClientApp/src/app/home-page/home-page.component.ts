import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchForm =  new FormGroup({
    city: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
    type: new FormControl(''),
  });

  expertForm = new FormGroup({
    city: new FormControl(''),
    field: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.getToken());

  }


  onSubmit(){}

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SearchService } from '../search/search.service';

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

  constructor(private authService: AuthService, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService.getToken());
  }


  onSubmit(){
    const val = this.searchForm.value;
    console.log(val.city);
    if(this.searchForm.invalid){
      console.log("invalid form!");
    }if(val.city){
      console.log(val.city);
      this.searchService.findByCity(val.city).subscribe(res =>{
        console.log(res[1].city);
        this.searchService.result = res;
        console.log(this.searchService.result[0])
        this.router.navigate(['search']);
      });
    }
  }

}

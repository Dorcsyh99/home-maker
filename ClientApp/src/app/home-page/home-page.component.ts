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

  expertMiniSearch = new FormGroup({
    city: new FormControl(''),
    field: new FormControl('')
  });


  constructor(private authService: AuthService, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    
  }


  onSubmit(){
    const val = this.searchForm.value;
    let minPrice, maxPrice;
    let query = {
      city: val.city,
      minPrice: 0,
      maxPrice: 999999999,
      type: val.type
    }
    console.log(val);
    if(this.searchForm.invalid){
      console.log("invalid form!");
    }if(val.minPrice){
       query.minPrice = val.minPrice;
    }if(val.maxPrice){
      query.maxPrice = val.maxPrice;
    }
    this.searchService.findByQuery(query).subscribe(res => {
      console.log("query: ", query)
      this.searchService.result = res;
      console.log(this.searchService.result);
    })
    

    /*if(val.city){
      console.log(val.city);
      this.searchService.findByCity(val.city).subscribe(res =>{
        console.log(res[1].city);
        this.searchService.result = res;
        console.log(this.searchService.result[0])
        this.router.navigate(['search']);
      });
    }*/
  }

}

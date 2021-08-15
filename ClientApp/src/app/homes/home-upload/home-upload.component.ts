import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Home } from '../home.model';
import { HomeService } from '../home.service';

interface Condition {
  value: string;
}

@Component({
  selector: 'app-home-upload',
  templateUrl: './home-upload.component.html',
  styleUrls: ['./home-upload.component.scss']
})
export class HomeUploadComponent implements OnInit {

  conditions: Condition[] = [
    {value: 'Újszerű' },
    {value: 'Felújítandó'},
    {value: 'Felújított'},
    {value: 'Újépítésű'},
  ];
  heats: Condition[] = [
    {value: 'Cirkó'},
    {value: 'Gáz'},
    {value: 'Központi fűtés'},
    {value: 'Egyedi'},
    {value: 'Padlófűtés'},
    {value: 'Elektromos'},
  ]
  step: number = 0;

  constructor(private homeService: HomeService, private fb: FormBuilder, private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
  }

  newHomeForm = this.fb.group({
    city: [''],
    city2: [''],
    address: [''],
    zip: [''],
    type: [''],
    level: [''],
    levelsInBuilding: [''],
    price: [''],
    size: [''],
    rooms: [''],
    year: [''],
    condition: [''],
    elevator: [''],
    attic: [''],
    garden: [''],
    pet: [''],
    smoke: [''],
    heating: [''],
    parking: [''],
    imageUrl: ['']
  });

  nextStep(){
    this.step++;
  }

  setStep(index: number){
    this.step = index;
  }



  onSubmit(){
    const val = this.newHomeForm.value;
    const home: Home = {city: val.city, city2: val.city2, address: val.address, zip: val.zip,
      type: val.type, level: val.level, levelsInBuilding: val.levelsInBuilding, price: val.price, size: val.size,
      rooms: val.rooms, year: val.year, condition: val.condition, elevator: val.elevator, attic: val.attic,
      garden: val.garden, pet: val.pet, smoke: val.smoke, heating: val.heating, parking: val.parking, image: val.imageUrl}
    this.homeService.create(home);
  }

}

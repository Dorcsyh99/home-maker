import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Home } from '../home.model';
import { HomeService } from '../home.service';

interface Condition {
  value: string;
}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
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
  imageName: string[] = [];
  selectedImages: ImageSnippet[] = [];
  fileSelected: boolean = false;
  step: number = 0;
  images: File[] = [];

  constructor(private homeService: HomeService, private fb: FormBuilder, private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
  }
  homeForm = new FormGroup({
    address: new FormGroup({
      city: new FormControl(''),
      city2: new FormControl(''),
      address: new FormControl(''),
      zip: new FormControl(''),
    }),
    information: new FormGroup({
      type: new FormControl(''),
      size: new FormControl(''),
      price: new FormControl(''),
      level: new FormControl(''),
      levelsInBuilding: new FormControl(''),
      rooms: new FormControl(''),
      year: new FormControl(''),
      condition: new FormControl('')
    }),
    booleans: new FormGroup({
      heating: new FormControl(''),
      garden: new FormControl(''),
      attic: new FormControl(''),
      pet: new FormControl(''),
      elevator: new FormControl(''),
      smoke: new FormControl(''),
      parking: new FormControl(''),
    }),
    image: new FormControl('')
  });

  nextStep(){
    this.step++;
  }

  setStep(index: number){
    this.step = index;
  }

  processFile(event: any){
    if(event.target.files && event.target.files[0]){
      this.fileSelected = true;
      var numberOfImages = event.target.files.length;
      for(let i = 0; i < numberOfImages; i++){
        this.selectedImages.push(new ImageSnippet(event.target.files[i].name, event.target.files[i]))
      }
      console.log(this.selectedImages);
    }

  }

  onSubmit(){
    let val = this.homeForm.;
    console.log(this.homeForm.get("city"));
    const newHomeData = new FormData();
    newHomeData.append('city', val.city);
    newHomeData.append('city2', val.city2);
    newHomeData.append('address', val.address);
    newHomeData.append('zip', val.zip);
    newHomeData.append('type', val.type);
    newHomeData.append('level', val.level);
    newHomeData.append('levelsInBuilding', val.levelsInBuilding);
    newHomeData.append('price', val.price);
    newHomeData.append('size', val.size);
    newHomeData.append('rooms', val.rooms);
    newHomeData.append('year', val.year);
    newHomeData.append('condition', val.condition);
    newHomeData.append('elevator', val.elevator);
    newHomeData.append('attic', val.attic);
    newHomeData.append('garden', val.garden);
    newHomeData.append('pet', val.pet);
    newHomeData.append('smoke', val.smoke);
    newHomeData.append('heating', val.heating);
    newHomeData.append('parking', val.parking);
    this.selectedImages.forEach(image => {
      newHomeData.append('images[]', image.file)
    });
    this.homeService.create(newHomeData);
  }
}


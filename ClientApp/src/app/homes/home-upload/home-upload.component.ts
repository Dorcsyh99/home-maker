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
  selectedImage!: ImageSnippet;
  fileSelected: boolean = false;
  step: number = 0;
  images: File[] = [];

  constructor(private homeService: HomeService, private fb: FormBuilder, private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
  }
  //ezt át kell irni FormData-val külön külön - másképp nem működik a fájlfeltöltés
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
        this.imageName.push(event.target.files[i].name);
        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.images.push(event.target.result);
          this.newHomeForm.patchValue({
            images: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onSubmit(){
    const val = this.newHomeForm.value;
    const home: Home = {
      city: val.city, city2: val.city2, address: val.address, zip: val.zip,
      type: val.type, level: val.level, levelsInBuilding: val.levelsInBuilding, price: val.price, size: val.size,
      rooms: val.rooms, year: val.year, condition: val.condition, elevator: val.elevator, attic: val.attic,
      garden: val.garden, pet: val.pet, smoke: val.smoke, heating: val.heating, parking: val.parking,
      image: []
    }
    let formData = new FormData();
    const blob = new Blob()
    this.images.forEach(image => {
      home.image.push(image);
    })
    console.log('Image: ', home.image);
      this.homeService.create(home);
  }

}
function b64toBlob(image: File): string | Blob {
  throw new Error('Function not implemented.');
}


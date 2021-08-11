import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-upload',
  templateUrl: './home-upload.component.html',
  styleUrls: ['./home-upload.component.scss']
})
export class HomeUploadComponent implements OnInit {

  addressForm: FormGroup;
  basicForm: FormGroup;
  additionalForm: FormGroup;
  imageForm: FormGroup;
  type?: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.addressForm = fb.group({
      city: [''],
      city2: [''],
      address: [''],
      level: [''],
      levelsInBuilding: ['']
    })
    this.basicForm = fb.group({
      size: [''],
      rooms: [''],
      price: [''],
      condition: [''],
      year: [''],
      heating: [''],
      parking: ['']
    })
    this.additionalForm = fb.group({
      garden: [''],
      attic: [''],
      elevator: [''],
      pet: [''],
      smoke: ['']
    })
    this.imageForm = fb.group({
      image: ['']
    })
   }

  ngOnInit(): void {
  }

  typeSelector(type: string){
    if(type === "Elado"){
      this.type = "Elado";
    }
    if(type === "Kiado"){
      this.type = "Kiado";
    }
  }

  addressData(){

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Field {
  value: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  form:FormGroup;
  expertForm:FormGroup;
  fields: Field[] = [
    {value: 'Tetőfedő'},
    {value: 'Villanyszerelő'},
    {value: 'Vízvezetékszerelő'}
  ];

  constructor(private fb:FormBuilder,
               private authService: AuthService,
               private router: Router) {

      this.form = this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['',Validators.required],
        password: ['',Validators.required]
      });
      this.expertForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        mainField: [''],
        email: ['',Validators.required],
        password: ['',Validators.required]
      })
  }



  ngOnInit() {
  }

  onSignup(role: string){
    const val = this.form.value;
    const expVal = this.expertForm.value;

    if(role === 'User'){
      this.authService.createUser(val.firstName, val.lastName, val.email, val.password);
    }
    if(role === 'Expert'){
      this.authService.createExpert(expVal.firstName, expVal.lastName, expVal.mainField, expVal.email, expVal.password);
    }
  }



}

@Component({
  selector: 'app-successful-registration',
  templateUrl: './success.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SuccessfulRegistrationComponent{

  ngOnInit(){

  }

}

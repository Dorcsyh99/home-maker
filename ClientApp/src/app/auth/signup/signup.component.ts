import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  role = "User";
  form: FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private router: Router) {

this.form = this.fb.group({
email: ['',Validators.required],
password: ['',Validators.required]
});
}

  ngOnInit() {
  }

  onSignup(form: NgForm){
    if(form.invalid){
      console.log('invalid form!');
    }
    console.log("belépett ide");
    console.log(form.value.email, form.value.password);
    this.authService.createUser(form.value.email, form.value.password, this.role);
  }

}

@Component({
  selector: 'app-successful-registration',
  templateUrl: './success.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SuccessfulRegistrationComponent{

}

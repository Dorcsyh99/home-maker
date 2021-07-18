import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthIntercepter } from './auth/auth-interceter';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent, SuccessfulRegistrationComponent } from './auth/signup/signup.component';
import { UserhomeComponent } from './auth/userhome/userhome.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";



import {MatFormFieldModule} from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    SuccessfulRegistrationComponent,
    UserhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AuthIntercepter,
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

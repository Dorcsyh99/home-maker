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
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



import {MatFormFieldModule} from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeGetComponent } from './homes/home-get/home-get.component';
import { HomeAllComponent } from './homes/home-all/home-all.component';
import { HomeUploadComponent } from './homes/home-upload/home-upload.component';
import { ExpertGetComponent } from './experts/expert-get/expert-get.component';
import { ExpertAllComponent } from './experts/expert-all/expert-all.component';
import { ExpertHomeComponent } from './experts/admin/expert-home/expert-home.component';
import { ExpertUpdateComponent } from './experts/admin/expert-update/expert-update.component';
import { HomeFeaturedComponent } from './homes/home-featured/home-featured.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    SuccessfulRegistrationComponent,
    UserhomeComponent,
    HomeGetComponent,
    HomeAllComponent,
    HomeUploadComponent,
    ExpertGetComponent,
    ExpertAllComponent,
    ExpertHomeComponent,
    ExpertUpdateComponent,
    HomeFeaturedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AuthIntercepter,
    MatMenuModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

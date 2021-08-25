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
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';



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
import { AddRateComponent } from './rates/add-rate/add-rate.component';
import { AgentsComponent } from './re-agent/agents/agents.component';
import { AgentComponent } from './re-agent/agent/agent.component';
import { AgentHomeComponent } from './re-agent/admin/agent-home/agent-home.component';
import { AuthGuard } from './auth/auth.guard';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { UploadAvatarComponent } from './auth/user/upload-avatar/upload-avatar.component';
import { UpdateProfileComponent } from './auth/user/update-profile/update-profile.component';
import { MyHomesComponent } from './homes/my-homes/my-homes.component';
import { SavedHomesComponent } from './homes/saved-homes/saved-homes.component';


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
    HomeFeaturedComponent,
    AddRateComponent,
    AgentsComponent,
    AgentComponent,
    AgentHomeComponent,
    SearchResultComponent,
    UploadAvatarComponent,
    UpdateProfileComponent,
    MyHomesComponent,
    SavedHomesComponent
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
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepter,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

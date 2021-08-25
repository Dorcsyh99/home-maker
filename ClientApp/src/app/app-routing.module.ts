import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent, SuccessfulRegistrationComponent } from './auth/signup/signup.component';
import { UpdateProfileComponent } from './auth/user/update-profile/update-profile.component';
import { UploadAvatarComponent } from './auth/user/upload-avatar/upload-avatar.component';
import { UserhomeComponent } from './auth/userhome/userhome.component';
import { ExpertHomeComponent } from './experts/admin/expert-home/expert-home.component';
import { ExpertUpdateComponent } from './experts/admin/expert-update/expert-update.component';
import { ExpertAllComponent } from './experts/expert-all/expert-all.component';
import { ExpertGetComponent } from './experts/expert-get/expert-get.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeAllComponent } from './homes/home-all/home-all.component';
import { HomeFeaturedComponent } from './homes/home-featured/home-featured.component';
import { HomeGetComponent } from './homes/home-get/home-get.component';
import { HomeUploadComponent } from './homes/home-upload/home-upload.component';
import { MyHomesComponent } from './homes/my-homes/my-homes.component';
import { SavedHomesComponent } from './homes/saved-homes/saved-homes.component';
import { SearchResultComponent } from './search/search-result/search-result.component';


const routes: Routes = [
  { path: '', component: HomePageComponent  },
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'userhome', component: UserhomeComponent, canActivate: [AuthGuard]},
  {path: 'success', component: SuccessfulRegistrationComponent},
  {path: 'home/get/:id', component: HomeGetComponent},
  {path: 'home/all', component: HomeAllComponent},
  {path: 'home/upload', component: HomeUploadComponent},
  {path: 'home/featured', component: HomeFeaturedComponent},
  {path: 'expert/get/:id', component: ExpertGetComponent},
  {path: 'expert/all', component: ExpertAllComponent},
  {path: 'expert/profile/:id', component: ExpertHomeComponent},
  {path: 'expert/update/:id', component: ExpertUpdateComponent},
  {path: 'search', component: SearchResultComponent},
  {path: 'upload/avatar', component: UploadAvatarComponent},
  {path: 'upload/profile/', component: UpdateProfileComponent},
  {path: 'homes/my/', component: MyHomesComponent},
  {path: 'homes/saved/', component: SavedHomesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

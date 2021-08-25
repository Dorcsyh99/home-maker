import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { AuthData, LoginData, LoggedInUser, AuthDataExpert } from './auth-data.model';
import { Router } from '@angular/router';
import {Subject, Observable} from "rxjs";
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Injectable({ providedIn: "root"})
export class AuthService {

  private token!: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId!: string;
  private userName!: string;
  private userData!: LoggedInUser;

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return moment().isBefore(this.getExpiration());
  }

  getUserId(){
    return this.userId;
  }

  getUserName(){
    return this.userName;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getUserData(){
    return this.userData;
  }

  getExpiration(){
    const expiration: any = localStorage.getItem("expiration");
    const expiresAt = expiration;
    return moment(expiration);
  }

  createUser(firstName: string, lastName: string, email: string, password: string){
    const authData: AuthData = {firstName: firstName, lastName: lastName, email: email, password: password, role: "User"};
    console.log("CreateUserben");
    this.http.post('http://localhost:3000/api/auth/signup', authData)
      .subscribe(res => {
        this.router.navigate(['success'])
      });
  }

  createExpert(firstName: string, lastName: string, mainField: string, email: string, password: string){
    const authData: AuthDataExpert = {firstName: firstName, lastName: lastName, mainField: mainField, email: email, password: password}
    this.http.post('http://localhost:3000/api/auth/signup', authData)
    .subscribe(res => {
      this.router.navigate(['success'])
    });
  }

  createREAgent(){}

  login(email: string, password: string){
    const loginData: LoginData = {email: email, password: password};
    console.log(loginData);
    this.http.post<{accessToken: string, expiresIn: number, userId: string, userName: string}>('http://localhost:3000/api/auth/signin', loginData)
      .subscribe(response => {
        const token = response.accessToken;
        this.token = token;
        console.log("token: ", response.accessToken);
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.userName;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log("Date:", expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
          console.log("vegen: ", this.userId);
          this.router.navigate([`userhome`]);
        }
      });
  }

  getUser(auth_token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get<{
      email: string,
    }>("http://localhost:3000/api/auth/me", {headers: headers});
  }

  uploadAvatar(userId: string, image: File): Observable<any>{
    const formData = new FormData();

    formData.append('file', image);
    return this.http.post(`${'http://localhost:3000/api/auth/'}${userId}${"/avatar"}`, formData);
  }




  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId as string;
      this.userName = authInformation.userName as string;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null as unknown as string;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null as unknown as string;
    this.userName = null as unknown as string;
    window.location.reload();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string){
    localStorage.setItem('accessToken', token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    console.log("authdata elmentve");
  }

  private clearAuthData(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }

  private getAuthData(){
    const token = localStorage.getItem("accessToken");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("UserName");
    if(!token || !expirationDate){
      console.log("token expired!");
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName
    }

  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }
}

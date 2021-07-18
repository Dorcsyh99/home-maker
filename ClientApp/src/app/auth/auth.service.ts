import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData, LoginData, LoggedInUser } from './auth-data.model';
import { Router } from '@angular/router';
import {Subject, Observable} from "rxjs";
import { map, tap } from 'rxjs/operators';

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
    return this.isAuthenticated;
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

  createUser(email: string, password: string, role: string){
    const authData: AuthData = {email: email, password: password, role: role};
    console.log("CreateUserben");
    this.http.post('http://localhost:3000/auth/signup', authData)
      .subscribe(res => {
        this.router.navigate(['success'])
      });
  }

  login(email: string, password: string){
    const loginData: LoginData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string}>('http://localhost:3000/auth/signin', loginData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.userName;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
          this.router.navigate([`homepage`]);
        }
      });
  }

  getUser(id: string){
    return this.http.get<{
      email: string,
      phone: number,
      firstName: string,
      lastName: string,
      image: string,
      role: string,
      uploadedProperties: number,
      registrationDate: Date,
      password: string,
      jobTitle: string
    }>("http://localhost:3000/auth//" + id);
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
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string){
    localStorage.setItem('token', token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("UserName");
    if(!token || !expirationDate){
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

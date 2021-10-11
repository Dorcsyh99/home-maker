import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home } from './home.model';
import { Router } from '@angular/router';

const baseURL = 'http://localhost:3000/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  //home/  -Get all
  readAll(): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/home/all`);
  }

  //home/:id  - Get one
  read(id: string): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  //home/create  - Upload
  create(data: Home){
    console.log("Data: ", data);
    return this.httpClient.post("http://localhost:3000/home/create", data).subscribe(res => {
      console.log("visszaértünk a frontendre a dataval");
      this.router.navigate(['/']);
    });
  }

  getHomesOfUser(id: string){

  }

  //home/:id  - Patch (update)
  update(id: string, data: FormData): Observable<any> {
    return this.httpClient.put(`${baseURL}/${id}`, data);
  }

  //home/:id  - Delete
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }

  getFeaturedHomes() : Observable<any>{
    return this.httpClient.get("http://localhost:3000/search/homes/featured");
  }

}

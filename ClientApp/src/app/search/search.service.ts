import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Home } from '../homes/home.model';

const baseURL = 'http://localhost:3000/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  result: any = [];

  getResult(){
    return this.result;
  }

  findByCity(city: string): Observable<any>{
    return this.httpClient.get(`${baseURL}/${city}`);
  }

}


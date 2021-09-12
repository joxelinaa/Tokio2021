import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DosadasnjiRekordiService {

  uri = 'http://localhost:4000';
  constructor(private http:HttpClient) { }

  dohvatiDosadasnjeRekorde(){
    return this.http.get(`${this.uri}/dosadasnjiRekordi/dohvatiDosadasnjeRekorde`);
  }
}

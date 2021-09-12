import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsvojeneMedaljeService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  dohvatiOsvojeneMedalje(){
    return this.http.get(`${this.uri}/osvojeneMedalje/dohvatiOsvojeneMedalje`);
  }

  dodajZlato(zemlja){
    const data={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/osvojeneMedalje/dodajZlato`,data);
  }

  dodajSrebro(zemlja){
    const data={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/osvojeneMedalje/dodajSrebro`,data);
  }
  
  dodajBronzu(zemlja){
    const data={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/osvojeneMedalje/dodajBronzu`,data);
  }

  azurirajRang(zemlja,rang){
    const data={
      zemlja:zemlja,
      rang:rang
    }
    return this.http.post(`${this.uri}/osvojeneMedalje/azurirajRang`,data);
  }
  
}

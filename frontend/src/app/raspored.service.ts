import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  unesiRaspored(sport,disciplina,datum,vreme,lokacija,ucesnici,pol){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      datum:datum,
      vreme:vreme,
      lokacija:lokacija,
      ucesnici:ucesnici,
      pol:pol
    }
    return this.http.post(`${this.uri}/raspored/unesiRaspored`,data);
  }

  proveriLokacijuIVreme(datum,lokacija,vreme){
    const data={
      datum:datum,
      lokacija:lokacija,
      vreme:vreme
    }
    return this.http.post(`${this.uri}/raspored/proveriLokacijuIVreme`,data);
  }

  dohvatiRasporede(){
    return this.http.get(`${this.uri}/raspored/dohvatiRasporede`);
  }
}

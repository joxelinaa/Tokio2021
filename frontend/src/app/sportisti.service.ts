import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistiService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  dodajSportistu(imePrezime, zemlja, sport, sportskaDisciplina,pol){
    const data={
      imePrezime:imePrezime,
      zemlja:zemlja,
      sport:sport,
      sportskaDisciplina:sportskaDisciplina,
      pol:pol,
      osvajac:"ne"
    }
    return this.http.post(`${this.uri}/sportisti/dodajSportistu`,data);
  }

  dohvatiSportisteZaTakmicenje(sport,pol){
    const data={
      sport:sport,
      pol:pol
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiSportisteZaTakmicenje`,data);
  }

  dohvatiSveSportiste(){
    return this.http.get(`${this.uri}/sportisti/dohvatiSveSportiste`);
  }
  dohvatiBrojSportistaIzDateZemlje(zemlja){
    const data={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiBrojSportistaIzDateZemlje`,data);
  }

  pretraziSportiste(imePrezime,zemlja,sport,disciplina,pol,osvajac){
    const data={
      imePrezime:imePrezime,
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      osvajac:osvajac
    }
    return this.http.post(`${this.uri}/sportisti/pretraziSportiste`,data);
  }

  dohvatiSportistu(imePrezime,sport){
    const data={
      imePrezime:imePrezime,
      sport:sport
    }
    return this.http.post(`${this.uri}/sportisti/dohvatiSportistu`,data);
  }

  azurirajMedalje(imePrezime,sport){
    const data={
      imePrezime:imePrezime,
      sport:sport
    }
    return this.http.post(`${this.uri}/sportisti/azurirajMedalje`,data);
  }
 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportIDisciplineService {

  
  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  unesiSportIDisciplinu(sport,disciplina,vrsta,brojIgraca){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      vrsta:vrsta,
      brojIgraca:brojIgraca
    }
    return this.http.post(`${this.uri}/sportIDisciplina/ubaciSportIDisciplinu`,data);
  }

  prikaziDiscipline(sport){
    const data={
      sport:sport
    }
    return this.http.post(`${this.uri}/sportIDisciplina/prikaziDiscipline`,data);
  }
  

  prikaziEkipneDiscipline(sport){
    const data={
      sport:sport
    }
    return this.http.post(`${this.uri}/sportIDisciplina/prikaziEkipneDiscipline`,data);
  }

  prikaziSveSportove(){
    return this.http.get(`${this.uri}/sportIDisciplina/prikaziSveSportove`);
  }
}

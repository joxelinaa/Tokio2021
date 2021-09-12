import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {
  

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  unesiIndividualnoTakmicenje(sport,disciplina,format,pol,pocetak,kraj,lokacije,ucesnici,delegati,unetRaspored){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      vrsta:"individ",
      format:format,
      pol:pol,
      pocetak:pocetak,
      kraj:kraj,
      lokacije:lokacije,
      ucesnici:ucesnici,
      delegati:delegati,
      unetRaspored:unetRaspored
    }
    return this.http.post(`${this.uri}/takmicenje/unesiIndividualnoTakmicenje`,data);
  }

  unesiEkipnoTakmicenje(sport,disciplina,format,pol,pocetak,kraj,lokacije,ucesnici,delegati,unetRaspored){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      vrsta:"ekipno",
      format:format,
      pol:pol,
      pocetak:pocetak,
      kraj:kraj,
      lokacije:lokacije,
      ucesnici:ucesnici,
      delegati:delegati,
      unetRaspored:unetRaspored
    }
    return this.http.post(`${this.uri}/takmicenje/unesiEkipnoTakmicenje`,data);
  }


  postojiTakmicenje(sport,disciplina,pol){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      pol:pol
    }
    return this.http.post(`${this.uri}/takmicenje/postojiTakmicenje`,data);

  }

  dohvatiSvaTakmicenjaBezUnetogRasporeda(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSvaTakmicenjaBezUnetogRasporeda`);
  }


  azurirajRasporedTakmicenja(sport,disciplina,pol){
    const data={
      sport:sport,
      sportskaDisciplina:disciplina,
      pol:pol
    }
    return this.http.post(`${this.uri}/takmicenje/azurirajRasporedTakmicenja`,data);
  }

  dohvatiSvaTakmicenja(){
    return this.http.get(`${this.uri}/takmicenje/dohvatiSvaTakmicenja`);
  }

}

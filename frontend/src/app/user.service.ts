import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';
  constructor(private http:HttpClient) { 
  }

  login(username, password,tip){
    const data={
      username:username,
      password:password,
      tip:tip
    }
    return this.http.post(`${this.uri}/korisnik/login`, data);
  }

  proveriDaLiPostojiVodja(nacionalnost){
    const data={
      nacionalnost:nacionalnost
    }
    return this.http.post(`${this.uri}/korisnik/proveriDaLiPostojiVodja`, data);
  }

  dodajZahtev(ime,prezime,username,password,password1,email,nacionalnost,tip){
    let nadgleda=-1;
    if (tip=='delegat') nadgleda=0;
    const data={
      username:username,
      ime:ime,
      prezime:prezime,
      password:password,
      password1:password1,
      nacionalnost:nacionalnost,
      email:email,
      tip:tip,
      nadgleda:nadgleda
    }
    return this.http.post(`${this.uri}/korisnickiZahtev/dodajZahtev`,data);
  }

  dohvatiSveZahteve(){
    return this.http.get(`${this.uri}/korisnickiZahtev/dohvatiSveZahteve`);
  }

  odobriZahtev(ime,prezime,username,password,email,nacionalnost,tip){
    let nadgleda=-1;
    if (tip=='delegat') nadgleda=0;
    const data={
      username:username,
      ime:ime,
      prezime:prezime,
      password:password,
      nacionalnost:nacionalnost,
      email:email,
      tip:tip,
      nadgleda:nadgleda
    }
    return this.http.post(`${this.uri}/korisnik/dodajKorisnika`,data);
  }

  promeniLozinku(username, old_password,new_password){
    const data={
      username:username,
      old_password:old_password,
      new_password:new_password
    }
    return this.http.post(`${this.uri}/korisnik/promeniLozinku`, data);
  }

  dohvatiDelegate(){
    return this.http.get(`${this.uri}/korisnik/dohvatiDelegate`);
  }
  
  azurirajNadgledanjeDelegata(ime, prezime){
    const data={
      ime:ime,
      prezime:prezime
    }
    return this.http.post(`${this.uri}/korisnik/azurirajNadgledanjeDelegata`,data);
  }

  obrisiZahtev(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/korisnickiZahtev/obrisiZahtev`,data);
  }
}

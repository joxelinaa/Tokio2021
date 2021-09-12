import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../user.service';
import alertify from "alertifyjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  kor_ime:string;
  lozinka:string;
  tip:string;
  poruka:string;

  login(){
    this.korisnikServis.login(this.kor_ime,this.lozinka,this.tip).subscribe((user:Korisnik)=>{
      if(user){
        localStorage.setItem("ulogovan", JSON.stringify(user));
        if(user.tip=="organizator"){
          this.router.navigate(["organizator"]);
        }else{
          if(user.tip=="delegat"){
            this.router.navigate(["delegat"]);
          }else{
            this.router.navigate(["vodja nacionalne delegacije"]);
          }
        }
      }else{
        alertify.error("Neispravno uneti podaci");
        this.router.navigate([""]);
      }
    })
  }

  loginPrikaz(){
    this.router.navigate([""]);
  }
  registracijaPrikaz(){
    this.router.navigate(["register"]);
  }
  neregistrovanKorisnikPrikaz(){
    this.router.navigate(['neregistrovan-korisnik']);
  }

  promeniLozinku(){
    this.router.navigate(['promeni-lozinku']);
  }
}

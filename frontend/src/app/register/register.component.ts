import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import alertify from "alertifyjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private korisnikServis:UserService) { }

  ngOnInit(): void {
  }

  loginPrikaz(){
    this.router.navigate(['']);
  }
  registerPrikaz(){
    this.router.navigate(['register']);
  }
  ime:string;
  prezime:string;
  username:string;
  password:string;
  password1:string;
  nacionalnost:string;
  tip:string;
  email:string;
  message:string='';

  dodajZahtev(){
    let provera=this.proveriLozinku();
    if (provera==true){
      this.message="";
      this.korisnikServis.dodajZahtev(this.ime,this.prezime,this.username,this.password,this.password1,this.email,this.nacionalnost,this.tip).
    subscribe(response=>{
      if (response['message']=='user added'){
        alertify.success('Dodat korisnicki zahtev')
      } else if (response['message']=='bad password'){
        alertify.error("Greska sa lozinkom");
      } else if (response['message']=='user exists'){
        alertify.error("Korisnicko ime zauzeto");
      }
    })
    } 
    else alertify.error("Neispravan format lozinke");
    
  }

  proveriLozinku():boolean{
    let ok=true;
    let ponavljanje=1;
    let prev=this.password[0];
    for (let i=1;i<this.password.length;i++){
      let cur=this.password[i];
      if (cur==prev){
        ponavljanje++;
      }else {
        ponavljanje=1;
      }
      prev=cur;
      if (ponavljanje==3){
        ok=false;
        break;
      }
    }
    let regex=new RegExp("^(?=(.*[a-z]){3,})(?=.*[A-Z])(?=(.*[0-9]){2,})(?=(.*[!@#\$%\^&\*\/]){2,})(?=.{8,12})");
    if (ok && regex.test(this.password) && (/[a-z]/.test(this.password[0]) || /[A-Z]/.test(this.password[0]))){
      return true;
    }

    else return false;
  }


}

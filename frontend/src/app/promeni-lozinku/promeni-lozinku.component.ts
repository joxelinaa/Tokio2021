import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import alertify from "alertifyjs";

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  constructor(private korisnikServis:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  kor_ime:string;
  stara_lozinka:string;
  nova_lozinka:string;
  poruka:string="";

  promeniLozinku(){
    let provera=this.proveriLozinku();
    if (provera==true){
      this.poruka="";
      this.korisnikServis.promeniLozinku(this.kor_ime,this.stara_lozinka,this.nova_lozinka).subscribe(res=>{
        if (res['message']=='ok') {
          alertify.success('Promenjena lozinka'); 
          this.router.navigate([""]);
        }else
          if (res['message']=='ne postoji korisnik')
          alertify.error('Neispravan username ili lozinka');
         else if (res['message']=='iste lozinke')
         alertify.error("Nova lozinka ne sme biti ista kao stara");
      });
    }else {alertify.error("Neispravan format lozinke");}
    
  }


  proveriLozinku():boolean{
    let ok=true;
    let ponavljanje=1;
    let prev=this.nova_lozinka[0];
    for (let i=1;i<this.nova_lozinka.length;i++){
      let cur=this.nova_lozinka[i];
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
    if (ok && regex.test(this.nova_lozinka) && (/[a-z]/.test(this.nova_lozinka[0]) || /[A-Z]/.test(this.nova_lozinka[0]))){
      return true;
    }

    else return false;
  }

 
}

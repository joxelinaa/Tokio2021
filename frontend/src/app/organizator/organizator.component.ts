import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { DosadasnjiRekordiService } from '../dosadasnji-rekordi.service';
import { Delegat } from '../models/delegat';
import { DosadasnjiRekordi } from '../models/dosadasnjiRekordi';
import { Korisnik } from '../models/korisnik';
import { Lokacija } from '../models/lokacija';
import { SportIDiscipline } from '../models/sportIDiscipline';
import { Sportista } from '../models/sportista';
import { sportskaDisciplina } from '../models/sportskaDisciplina';
import { Takmicenje } from '../models/takmicenje';
import { Ucesnik } from '../models/ucesnik';
import { SportIDisciplineService } from '../sport-idiscipline.service';
import { SportistiService } from '../sportisti.service';
import { TakmicenjeService } from '../takmicenje.service';
import { UserService } from '../user.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private rekordiServis:DosadasnjiRekordiService,private sportIDisciplinaServis:SportIDisciplineService,
     private router:Router,private takmicenjeServis:TakmicenjeService, private sportistiServis:SportistiService,
     private korisnikServis:UserService) { }

  ngOnInit(): void {
    this.sportIDisciplinaServis.prikaziSveSportove().subscribe((sd:SportIDiscipline[])=>{
      this.sportovi=sd;
      let dodaj=true;
      this.sportovi.forEach(element=>{
        this.sportoviFiltrirani.forEach(i=>{
          if (element.sport==i.sport){
            dodaj=false;
          }
        })
        if (dodaj && element.vrsta=='individ'){
          this.sportoviFiltrirani.push(element);
        }
        dodaj=true;
      })


      dodaj=true;
      this.sportovi.forEach(element=>{
        this.sportoviEkipniFiltrirani.forEach(i=>{
          if (element.sport==i.sport){
            dodaj=false;
          }
        })
        if (dodaj && element.vrsta=='ekipni'){
          this.sportoviEkipniFiltrirani.push(element);
        }
        dodaj=true;
      })
      

      
    });
    
    this.korisnikServis.dohvatiDelegate().subscribe((d:Korisnik[])=>{
      let n=0;
      d.forEach(element=>{
        if (element.nadgleda<3){
          this.TEdelegati[n]=element;
          this.TIdelegati[n++]=element;
          
        }
      })
    })
   
  }


  dohvatiRekorde(){
    this.router.navigate(['pregled-dosadasnjih-rekorda']);
  }

  sport:string;
  sportskaDisciplina:string;
  vrsta:string;
  brojIgraca:string;

  TIsport:string;
  TIsportskaDisciplina:string;
  TIformat:string;
  TIpol:string;
  TIpocetak:string;
  TIkraj:string;
  TIlokacija:string="";
  TIizabraneLokacije:Lokacija[]=[];
  TIizabraniUcesnici:Ucesnik[]=[];
  TIizabraniDelegati:Delegat[]=[];
  TIizabraniUcesniciString:string[]=[];
  TIizabraniDelegatiString:string[]=[];
  TIucesnici:Sportista[]=[];
  TIdelegati:Korisnik[]=[];

  unosNosioca:boolean=false;


  TEsport:string;
  TEsportskaDisciplina:string;
  TEformat:string;
  TEpol:string;
  TEpocetak:string;
  TEkraj:string;
  TElokacija:string="";
  TEizabraneLokacije:Lokacija[]=[];
  TEizabraniUcesnici:Ucesnik[]=[];
  TEizabraniDelegati:Delegat[]=[];
  TEizabraniUcesniciString:string[]=[];
  TEizabraniDelegatiString:string[]=[];
  TEucesnici:Sportista[]=[];
  TEdelegati:Korisnik[]=[];

  sportovi:SportIDiscipline[]=[];
  discipline:SportIDiscipline[]=[];
  sportoviFiltrirani:SportIDiscipline[]=[];
  sportoviEkipniFiltrirani:SportIDiscipline[]=[];

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }


  unesiIndividualnoTakmicenje(){

    this.takmicenjeServis.postojiTakmicenje(this.TIsport,this.TIsportskaDisciplina,this.TIpol).subscribe((t:Takmicenje)=>{
      if (t==null){
        let tekst=this.TIlokacija.split(",");
        for (let i=0;i<tekst.length;i++){
          this.TIizabraneLokacije[i]={
            lokacija:tekst[i]
          }
        }
        if (this.TIsportskaDisciplina!="singl"){
          this.TIizabraniUcesnici=[];
          for (let i=0;i<this.TIizabraniUcesniciString.length;i++){
            this.TIizabraniUcesnici[i]={
              ucesnik:this.TIizabraniUcesniciString[i],
              rezultat:null
            }
          }
        }
      
    
        for (let i=0;i<this.TIizabraniDelegatiString.length;i++){
          this.TIizabraniDelegati[i]={
            delegat:this.TIizabraniDelegatiString[i]
          }
        }
    
        for (let i=0;i<this.TIizabraniDelegatiString.length;i++){
          let imeprezime=this.TIizabraniDelegatiString[i].split(" ");
          let ime=imeprezime[0];
          let prezime=imeprezime[1];
          this.korisnikServis.azurirajNadgledanjeDelegata(ime, prezime).subscribe(res=>{
            if (res['message']=='ok') alertify.success('Azuriran delegat');
          })
        }
    
        let unetRaspored="ne";
        this.takmicenjeServis.unesiIndividualnoTakmicenje(this.TIsport,this.TIsportskaDisciplina,this.TIformat,this.TIpol,this.TIpocetak,
          this.TIkraj,this.TIizabraneLokacije,this.TIizabraniUcesnici,this.TIizabraniDelegati,unetRaspored).subscribe(res=>{
            if (res['message']=='ok') alertify.success('Dodato takmicenje');
          })
    
      }
      else {
        alertify.error("Takmicenje vec postoji!");
      }
    })

   
  }




provera:Takmicenje;
  unesiEkipnoTakmicenje(){
    this.takmicenjeServis.postojiTakmicenje(this.TEsport,this.TEsportskaDisciplina,this.TEpol).subscribe((t:Takmicenje)=>{
      this.provera=t;
      if (t==null){
        let tekst=this.TElokacija.split(",");
        for (let i=0;i<tekst.length;i++){
          this.TEizabraneLokacije[i]={
            lokacija:tekst[i]
          }
        }
        
        this.TEizabraniUcesnici=[];
        for (let i=0;i<this.TEizabraniUcesniciString.length;i++){
           this.TEizabraniUcesnici[i]={
             ucesnik:this.TEizabraniUcesniciString[i],
             rezultat:null
         }
        }

        for (let i=0;i<this.TEizabraniDelegatiString.length;i++){
          this.TEizabraniDelegati[i]={
          delegat:this.TEizabraniDelegatiString[i]
          }
        }

        for (let i=0;i<this.TEizabraniDelegatiString.length;i++){
          let imeprezime=this.TEizabraniDelegatiString[i].split(" ");
          let ime=imeprezime[0];
          let prezime=imeprezime[1];
          this.korisnikServis.azurirajNadgledanjeDelegata(ime, prezime).subscribe(res=>{
          if (res['message']=='ok') alertify.success('Azuriran delegat');
          })
        }

        let unetRaspored="ne";
        this.takmicenjeServis.unesiEkipnoTakmicenje(this.TEsport,this.TEsportskaDisciplina,this.TEformat,this.TEpol,this.TEpocetak,
        this.TEkraj,this.TEizabraneLokacije,this.TEizabraniUcesnici,this.TEizabraniDelegati,unetRaspored).subscribe(res=>{
        if (res['message']=='ok') alertify.success('Dodato takmicenje');
        else alertify.error("Nije dodato takmicenje");
        })
      }
     else {alertify.error("Takmicenje vec postoji");}
    })
  }




  unesiSportIDisciplinu(){
    this.sportIDisciplinaServis.unesiSportIDisciplinu(this.sport,this.sportskaDisciplina,this.vrsta,this.brojIgraca).subscribe(res=>{
      if (res['message']=='ok') alertify.success('Dodat sport i disciplina');
    })
  }

  prikaziDiscipline(){
    this.sportIDisciplinaServis.prikaziDiscipline(this.TIsport).subscribe((sd:SportIDiscipline[])=>{
     this.discipline=sd;
    })
  }

  prikaziEkipneDiscipline(){
    this.sportIDisciplinaServis.prikaziEkipneDiscipline(this.TEsport).subscribe((sd:SportIDiscipline[])=>{
     this.discipline=sd;
    })
  }

      
  prikaziUcesnike(){
    this.sportistiServis.dohvatiSportisteZaTakmicenje(this.TIsport,this.TIpol).
    subscribe((u:Sportista[])=>{
      this.TIucesnici=[];
      let n=0;
      for (let i=0;i<u.length;i++){
        for ( let j=0;j<u[i].sportskaDisciplina.length;j++){
          if (u[i].sportskaDisciplina[j].disciplina==this.TIsportskaDisciplina)
          this.TIucesnici[n++]=u[i];
        }
      }
    })
  }
  korisnickiZahteviPrikaz(){
    this.router.navigate(['korisnicki-zahtevi']);
  }


      
  prikaziEkipe(){
    this.sportistiServis.dohvatiSportisteZaTakmicenje(this.TEsport,this.TEpol).
    subscribe((u:Sportista[])=>{
      this.TEucesnici=[];
      let n=0;
      for (let i=0;i<u.length;i++){
          this.TEucesnici[n++]=u[i];
      }
    })
  }

  unesiNosioce(){
    if (this.TIsportskaDisciplina=='singl'){
      this.unosNosioca=true;
      if (this.TIizabraniUcesnici.length!=4 && this.TIizabraniUcesnici.length!=8 && this.TIizabraniUcesnici.length!=16){
        alertify.warning("Mora biti 4,8 ili 16 ucesnika!!");
      }
    }
    else this.unosNosioca=false;
  }

  prikaziNosioce(){
    this.TIizabraniUcesnici=[];
    for (let i=0;i<this.TIizabraniUcesniciString.length;i++){
      this.TIizabraniUcesnici[i]={
        ucesnik:this.TIizabraniUcesniciString[i],
        rezultat:null
    }
   }
  }
  


}

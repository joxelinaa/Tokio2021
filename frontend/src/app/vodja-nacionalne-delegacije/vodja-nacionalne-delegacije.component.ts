import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportIDiscipline } from '../models/sportIDiscipline';
import { sportskaDisciplina } from '../models/sportskaDisciplina';
import { Takmicenje } from '../models/takmicenje';
import { SportIDisciplineService } from '../sport-idiscipline.service';
import { SportistiService } from '../sportisti.service';
import { TakmicenjeService } from '../takmicenje.service';
import alertify from "alertifyjs"
@Component({
  selector: 'app-vodja-nacionalne-delegacije',
  templateUrl: './vodja-nacionalne-delegacije.component.html',
  styleUrls: ['./vodja-nacionalne-delegacije.component.css']
})
export class VodjaNacionalneDelegacijeComponent implements OnInit {

  constructor(private sportDisciplineServis:SportIDisciplineService, private takmicenjeServis:TakmicenjeService,
    private sportistiServis:SportistiService,private router:Router) { }

  ngOnInit(): void {
    this.sportDisciplineServis.prikaziSveSportove().subscribe((sd:SportIDiscipline[])=>{
      this.sportovi=sd;
      let dodaj=true;
      this.sportoviFiltrirani.push(this.sportovi[0]);
      this.sportovi.forEach(element=>{
        this.sportoviFiltrirani.forEach(i=>{
          if (element.sport==i.sport){
            dodaj=false;
          }
        })
        if (dodaj){
          this.sportoviFiltrirani.push(element);
        }
        dodaj=true;
      })

      let n=0;
      this.sportoviFiltrirani.forEach(element => {
        if (element.vrsta=='individ'){
          this.sportoviFiltriraniI[n++]=element;
        }
      });
      n=0;
      this.sportoviFiltrirani.forEach(element => {
        if (element.vrsta=='ekipni' || element.sport=='tenis'){
          this.sportoviFiltriraniE[n++]=element;
        }
      });



    });
    
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  imePrezime:string;
  ekipa:string;
  pol:string;
  polE:string;
  sport:string;
  sportE:string;
  sportovi:SportIDiscipline[]=[];
  discipline:SportIDiscipline[]=[];
  disciplineE:SportIDiscipline[]=[];
  disc:String;
  discE:String;
  sportoviFiltrirani:SportIDiscipline[]=[];
  sportoviFiltriraniI:SportIDiscipline[]=[];
  sportoviFiltriraniE:SportIDiscipline[]=[];
  brojIgraca:string;

  prijaviPojedinca(){
      let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    this.takmicenjeServis.postojiTakmicenje(this.sport,this.disc,this.pol).subscribe((t:Takmicenje)=>{
      if (t){
        alertify.error('Takmicenje, sport: ' + t.sport+", disciplina: "+t.sportskaDisciplina+" je zapoceto");
      } else{
        let sd=new sportskaDisciplina();
        sd.disciplina=this.disc;
        this.sportistiServis.dodajSportistu(this.imePrezime,korisnik.nacionalnost,this.sport,sd,this.pol).
        subscribe(res=>{
          if (res['message']=='ok') alertify.success('Dodat sportista '+this.imePrezime+" za disciplinu "+this.disc );
          if (res['message']=='disciplina postoji')alertify.error("Disciplina vec uneta");
        })
      }
    })

  }
  

  prikaziDiscipline(){
    this.sportDisciplineServis.prikaziDiscipline(this.sport).subscribe((sd:SportIDiscipline[])=>{
     this.discipline=sd;
    })
  }

  prikaziDisciplineEkipno(){
    this.sportDisciplineServis.prikaziEkipneDiscipline(this.sportE).subscribe((sd:SportIDiscipline[])=>{
     this.disciplineE=sd;
    })
  }

  prijaviEkipu(){
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    this.takmicenjeServis.postojiTakmicenje(this.sportE,this.discE,this.polE).subscribe((t:Takmicenje)=>{
      if (t){
        alertify.error('Takmicenje, sport: ' + t.sport+", disciplina: "+t.sportskaDisciplina+", pol: "+t.pol+" je zapoceto");
      } else{
        let br:string[]=[];
        this.sportovi.forEach(element=>{
          if (element.sport==this.sportE && element.sportskaDisciplina==this.discE){
            br=element.brojIgraca.split("/");
          }
        });
        if (parseInt(this.brojIgraca)>=parseInt(br[0]) && parseInt(this.brojIgraca)<=parseInt(br[1])){
        let sd=new sportskaDisciplina();
        sd.disciplina=this.discE;
        this.sportistiServis.dodajSportistu(this.ekipa,korisnik.nacionalnost,this.sportE,sd,this.polE).
        subscribe(res=>{
          if (res['message']=='ok') alertify.success('Dodat sportista '+this.ekipa+",sport:"+this.sportE+
          ",disciplina:"+this.discE+", pol:"+this.polE);
          if (res['message']=='disciplina postoji')alertify.error("Disciplina vec uneta");
        })
        } else alertify.error("Pogresan broj igraca!");
      }
    })
  }
}

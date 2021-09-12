import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { SportIDiscipline } from '../models/sportIDiscipline';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportIDisciplineService } from '../sport-idiscipline.service';
import { SportistiService } from '../sportisti.service';

@Component({
  selector: 'app-neregistrovan-korisnik',
  templateUrl: './neregistrovan-korisnik.component.html',
  styleUrls: ['./neregistrovan-korisnik.component.css']
})
export class NeregistrovanKorisnikComponent implements OnInit {

  constructor(private router:Router, private sportistiServis:SportistiService,
     private sportDisciplineServis:SportIDisciplineService) { }

  ngOnInit(): void {
    this.sportistiServis.dohvatiSveSportiste().subscribe((s:Sportista[])=>{
      this.sviSportisti=s;
      let dodaj=true;
      let k=0;
      for (let i=0;i<this.sviSportisti.length;i++){    
            for (let j=0;j<this.zemlje.length;j++){
              if (this.sviSportisti[i].zemlja==this.zemlje[j].zemlja){
                dodaj=false;
              }
            }
            if (dodaj){
            this.zemlje[k++]={
              zemlja:this.sviSportisti[i].zemlja,
              brojSportista:0
            }
          }
          dodaj=true;
          
      }



      this.sportDisciplineServis.prikaziSveSportove().subscribe((sd:SportIDiscipline[])=>{
        this.sportovi=sd;
        dodaj=true;
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
        this.discipline=[]
        this.sportovi.forEach(element => {
          if (element.sportskaDisciplina=="/" || element.sportskaDisciplina==" "){} 
        else{
          this.discipline[n++]=element;
        }
        });
        
        
      });


    })
    
    
  }
  sportovi:SportIDiscipline[];
  discipline:SportIDiscipline[]=[];
  sportoviFiltrirani:SportIDiscipline[]=[];
  imePrezime:string;
  sport:string;
  zemlja:string;
  disciplina:string;
  pol:string;
  osvajaci:boolean=false;
  sportisti:Sportista[]=[];
  sviSportisti:Sportista[];
  sportistiDisciplineFilter=[];
  zemlje:Zemlja[]=[];

  itemsPerPage: number;
  p: number = 1;

  pregledZemaljaUcesnica(){
    this.router.navigate(['pregled-zemalja-ucesnica']);
  }

  pregledOsvojenihMedalja(){
    this.router.navigate(['pregled-osvojenih-medalja']);
  }
  pretraga(){
    let t="ne";
    if (this.osvajaci) t="da";
    this.sportistiServis.pretraziSportiste(this.imePrezime,this.zemlja,this.sport,this.disciplina,this.pol,t).
    subscribe((s:Sportista[])=>{
      this.sportisti=s;
      if (this.disciplina=='sve discipline' || this.disciplina==null){
        this.sportistiDisciplineFilter=this.sportisti;
        for (let i=0;i<this.sportistiDisciplineFilter.length;i++){
          this.sportistiDisciplineFilter[i].discipline="";
          for (let j=0;j<this.sportistiDisciplineFilter[i].sportskaDisciplina.length-1;j++){
            this.sportistiDisciplineFilter[i].discipline+=this.sportistiDisciplineFilter[i].sportskaDisciplina[j].disciplina+", ";
          }
          this.sportistiDisciplineFilter[i].discipline+=this.sportistiDisciplineFilter[i].sportskaDisciplina[this.sportistiDisciplineFilter[i].sportskaDisciplina.length-1].disciplina;
        }
      }
      else{
        let n=0;
        this.sportistiDisciplineFilter=[];
        for (let i=0;i<this.sportisti.length;i++){
          for (let j=0;j<this.sportisti[i].sportskaDisciplina.length;j++){
            if (this.sportisti[i].sportskaDisciplina[j].disciplina==this.disciplina){
              this.sportistiDisciplineFilter[n]=this.sportisti[i];
              this.sportistiDisciplineFilter[n++].discipline=this.disciplina;
            }
          }
        }
      }



    })
  }

  
}

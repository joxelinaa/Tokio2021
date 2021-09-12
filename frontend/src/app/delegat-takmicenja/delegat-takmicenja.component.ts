import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lokacija } from '../models/lokacija';
import { Raspored } from '../models/raspored';
import { Takmicenje } from '../models/takmicenje';
import { Ucesnik } from '../models/ucesnik';
import { RasporedService } from '../raspored.service';
import { TakmicenjeService } from '../takmicenje.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-delegat-takmicenja',
  templateUrl: './delegat-takmicenja.component.html',
  styleUrls: ['./delegat-takmicenja.component.css']
})
export class DelegatTakmicenjaComponent implements OnInit {

  constructor(private takmicenjeServis:TakmicenjeService, private rasporedServis:RasporedService,
    private router:Router) { }

  ngOnInit(): void {
    this.takmicenjeServis.dohvatiSvaTakmicenjaBezUnetogRasporeda().subscribe((t:Takmicenje[])=>{
      this.svaTakmicenja=t;
      let delegat=JSON.parse(localStorage.getItem('ulogovan'));
      let d=delegat.ime;
      d+=" ";
      let n=0;
      d+=delegat.prezime;
      t.forEach(element=>{
        element.delegati.forEach(el1=>{
          if (el1.delegat==d){
            this.takmicenja[n++]=element;
          }
        })
      })
    })

    this.takmicenjeServis.dohvatiSvaTakmicenja().subscribe((t:Takmicenje[])=>{
      this.rasporedServis.dohvatiRasporede().subscribe((r:Raspored[])=>{
        // this.raspored=r;
        let ima=false;
        let d=JSON.parse(localStorage.getItem('ulogovan'));
         let n=0;
           t.forEach(element => {
             element.delegati.forEach(i=>{
               let imePrezime=i.delegat.split(" ");
               if (imePrezime[0]==d.ime && imePrezime[1]==d.prezime){
                 ima=true;
               }
             })
             if (ima && element.unetRaspored=="da"){
               r.forEach(element1 => {
                 if (element1.sportskaDisciplina==element.sportskaDisciplina && element1.pol==element.pol){//dodala ovo za pol
                   this.raspored[n++]=element1;
                 }
               });
               ima=false;
             }
           });
       })
    })
    
  }

  datum:string;
  vreme:string;
  svaTakmicenja:Takmicenje[];
  takmicenja:Takmicenje[]=[];
  takmicenje:string;
  ucesnici:Ucesnik[]=[];
  izgenerisaniUcesnici:Ucesnik[]=[];
  lokacije:Lokacija[]=[];
  lokacija:string;
  datumi:string[]=[];
  raspored:Raspored[]=[];

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  izgenerisiTakmicare(){
    let s=this.takmicenje.split(",");
    let sport=s[0];
    let disciplina=s[1];
    let pol=s[2];
    this.takmicenjeServis.postojiTakmicenje(sport,disciplina,pol).subscribe((t:Takmicenje)=>{
      let n=0;
      this.ucesnici=[];
      if (t){
        t.ucesnici.forEach(element=>{
          this.ucesnici[n++]=element;
        })
      }

      this.izgenerisaniUcesnici=[];
      if (this.ucesnici.length<8){
        this.izgenerisaniUcesnici=this.ucesnici;
      } else {
        let arr = [];
        while(arr.length < 8){
          let b=Math.random();
          if (b!=1){
            let r = Math.floor(Math.random() * this.ucesnici.length);
            if(arr.indexOf(r) == -1) arr.push(r);
          }
        }
        for (let i=0;i<8;i++){
          this.izgenerisaniUcesnici[i]=this.ucesnici[arr[i]];
        }
      }

    })
  }

  unesiLokacije(){
    let s=this.takmicenje.split(",");
    this.lokacije=[];
    let n=0;
    let sport=s[0];
    let disciplina=s[1];
    this.takmicenja.forEach(element => {//bila su svaTakmicenja prebacila sam na takmicenja
      if (element.sport==sport && element.sportskaDisciplina==disciplina){
        element.lokacije.forEach(el=>{
          this.lokacije[n++]=el;
        })
      }
    });

  }

provera(){
  let pocetak1="5.7.2021."
  let kraj1="15.7.2021."
  let p=pocetak1.split(".");
  let k=kraj1.split(".");
  
  let d=this.datum.split(".");
  let pocetak=new Date();
  let kraj=new Date();
  let datum=new Date();
  pocetak.setFullYear(parseInt(p[2]),(parseInt(p[1])-1),parseInt(p[0]));
  kraj.setFullYear(parseInt(k[2]),(parseInt(k[1])-1),parseInt(k[0]));
  datum.setFullYear(parseInt(d[2]),(parseInt(d[1])-1),parseInt(d[0]));
  alert("Datum izabran: "+datum.getTime()+", pocetak: "+pocetak.getTime()+", kraj: "+kraj.getTime());
}

  unesiRaspored(){
    let s=this.takmicenje.split(",");
    this.lokacije=[];
    let sport=s[0];
    let disciplina=s[1];
    let pol=s[2];
    this.takmicenjeServis.postojiTakmicenje(sport,disciplina,pol).subscribe((t:Takmicenje)=>{
      if (t){
        let p=t.pocetak.split(".");
        let k=t.kraj.split(".");
        let d=this.datum.split(".");
        let pocetak=new Date();
        let kraj=new Date();
        let datum=new Date();
        pocetak.setFullYear(parseInt(p[2]),(parseInt(p[1])-1),parseInt(p[0]));
        kraj.setFullYear(parseInt(k[2]),(parseInt(k[1])-1),parseInt(k[0]));
        datum.setFullYear(parseInt(d[2]),(parseInt(d[1])-1),parseInt(d[0]));
        if (datum.getTime()>=pocetak.getTime() && datum.getTime()<=kraj.getTime()){
          this.rasporedServis.proveriLokacijuIVreme(this.datum,this.lokacija,this.vreme).subscribe((r:Raspored)=>{
            if (r){
              alertify.error("Termin zauzet!");
            } else {
              this.rasporedServis.unesiRaspored(sport,disciplina,this.datum,this.vreme,this.lokacija,this.izgenerisaniUcesnici,pol).subscribe(res=>{
                if (res['message']=='ok') {
                  alertify.success('Dodat raspored');
                  this.takmicenjeServis.azurirajRasporedTakmicenja(sport,disciplina,pol).subscribe(res=>{
                    if (res['message']=='ok') alertify.success("Azuriran raspored takmicenja");
                  })
                }
              })
            }
          })
        } else {alertify.error("Neispravan datum!")}
      } else alertify.error("Greska pri unosu");
      
    })
   
  }

  unesiRezultat(r:Raspored){
    localStorage.setItem("raspored", JSON.stringify(r));
    this.router.navigate(['rezultat-takmicenja']);
  }
}

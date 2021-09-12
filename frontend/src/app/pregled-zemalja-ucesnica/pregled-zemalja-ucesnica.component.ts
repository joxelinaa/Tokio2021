import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportistiService } from '../sportisti.service';

@Component({
  selector: 'app-pregled-zemalja-ucesnica',
  templateUrl: './pregled-zemalja-ucesnica.component.html',
  styleUrls: ['./pregled-zemalja-ucesnica.component.css']
})
export class PregledZemaljaUcesnicaComponent implements OnInit {

  constructor(private sportistiServis:SportistiService,private router:Router) {
   }
  zemlje:Zemlja[]=[];
  sviSportisti:Sportista[]=[];
  zemljePrikaz:Zemlja[]=[];

  itemsPerPage: number;
  p: number = 1;

  ngOnInit(): void {
    this.sportistiServis.dohvatiSveSportiste().subscribe((sportisti:Sportista[])=>{
      this.sviSportisti=sportisti;
      let dodaj=true;
      let k=0;
      for (let i=0;i<this.sviSportisti.length;i++){    
          this.sportistiServis.dohvatiBrojSportistaIzDateZemlje(this.sviSportisti[i].zemlja).subscribe((n:number)=>{
            for (let j=0;j<this.zemlje.length;j++){
              if (this.sviSportisti[i].zemlja==this.zemlje[j].zemlja){
                dodaj=false;
              }
            }
            if (dodaj){
            this.zemlje[k++]={
              zemlja:this.sviSportisti[i].zemlja,
              brojSportista:n
            }
          }
          dodaj=true;
          })
      }
      
    })
   
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }

}

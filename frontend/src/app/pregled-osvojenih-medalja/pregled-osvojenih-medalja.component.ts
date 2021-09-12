import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { osvojeneMedalje } from '../models/osvojeneMedalje';
import { OsvojeneMedaljeService } from '../osvojene-medalje.service';

@Component({
  selector: 'app-pregled-osvojenih-medalja',
  templateUrl: './pregled-osvojenih-medalja.component.html',
  styleUrls: ['./pregled-osvojenih-medalja.component.css']
})
export class PregledOsvojenihMedaljaComponent implements OnInit {

  constructor(private osvojeneMedaljeServis:OsvojeneMedaljeService,private router:Router) { }

  ngOnInit(): void {
    this.osvojeneMedaljeServis.dohvatiOsvojeneMedalje().subscribe((o:osvojeneMedalje[])=>{
      this.medalje=o;
      for (let i=0;i<this.medalje.length;i++){
        this.medalje[i].ukupno=this.medalje[i].zlato+this.medalje[i].srebro+this.medalje[i].bronza;
      }
    })
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }
  medalje:osvojeneMedalje[]=[];
  itemsPerPage: number;
  p: number = 1;


}

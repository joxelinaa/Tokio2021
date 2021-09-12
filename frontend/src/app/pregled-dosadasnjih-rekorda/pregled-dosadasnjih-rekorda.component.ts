import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DosadasnjiRekordiService } from '../dosadasnji-rekordi.service';
import { DosadasnjiRekordi } from '../models/dosadasnjiRekordi';

@Component({
  selector: 'app-pregled-dosadasnjih-rekorda',
  templateUrl: './pregled-dosadasnjih-rekorda.component.html',
  styleUrls: ['./pregled-dosadasnjih-rekorda.component.css']
})
export class PregledDosadasnjihRekordaComponent implements OnInit {

  constructor(private rekordiServis:DosadasnjiRekordiService,private router:Router) { }

  ngOnInit(): void {
    this.rekordiServis.dohvatiDosadasnjeRekorde().subscribe((res:DosadasnjiRekordi[])=>{
      this.rekordi=res;
    });
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }
  rekordi:DosadasnjiRekordi[];
}

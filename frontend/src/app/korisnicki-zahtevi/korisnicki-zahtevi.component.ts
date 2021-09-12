import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnickiZahtev } from '../models/korisnickiZahtev';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../user.service';
import alertify from 'alertifyjs';

@Component({
  selector: 'app-korisnicki-zahtevi',
  templateUrl: './korisnicki-zahtevi.component.html',
  styleUrls: ['./korisnicki-zahtevi.component.css']
})
export class KorisnickiZahteviComponent implements OnInit {

  constructor(private korisnikServis:UserService,private router:Router) { }

  ngOnInit(): void {
    this.korisnikServis.dohvatiSveZahteve().subscribe((z:KorisnickiZahtev[])=>{
      this.zahtevi=z;
    })
  }

  zahtevi:KorisnickiZahtev[];
  cekirani:KorisnickiZahtev[]=[];

  odobri(){
    this.cekirani=this.zahtevi;
    this.cekirani.forEach(element => {
      if (element.cekiran){
        if (element.tip=='vodja nacionalne delegacije'){
          this.korisnikServis.proveriDaLiPostojiVodja(element.nacionalnost).subscribe((k:Korisnik)=>{
            if (k){
              alertify.error('Vec postoji vodja nacionalne delegacije zemlju: '+element.nacionalnost);
            } else {
              this.korisnikServis.odobriZahtev(element.ime, element.prezime,element.username,
                element.password,element.email,element.nacionalnost,element.tip).subscribe(res=>{
                if (res['message']=='user added') {
                  alertify.success('Zahtev vodje odobren');
                  this.korisnikServis.obrisiZahtev(element.username).subscribe(res=>{
                    if (res['message']=='ok'){
                      alertify.success('Obrisan zahtev vodje');
                    }
                  })
                }
              })
            }
          })
        }else {
          this.korisnikServis.odobriZahtev(element.ime, element.prezime,element.username,
            element.password,element.email,element.nacionalnost,element.tip ).subscribe(res=>{
            if (res['message']=='user added') {
              alertify.success('Zahtev delegata odobren');
              this.korisnikServis.obrisiZahtev(element.username).subscribe(res=>{
                if (res['message']=='ok'){
                  alertify.success('Obrisan zahtev delegata');
                }
              })
            }
          })
        }
        
      }
    });
    this.router.navigate(['korisnicki-zahtevi']);
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}

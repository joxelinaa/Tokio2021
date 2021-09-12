import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { osvojeneMedalje } from '../models/osvojeneMedalje';
import { Raspored } from '../models/raspored';
import { Sportista } from '../models/sportista';
import { Ucesnik } from '../models/ucesnik';
import { OsvojeneMedaljeService } from '../osvojene-medalje.service';
import { SportistiService } from '../sportisti.service';
import alertify from 'alertifyjs'

@Component({
  selector: 'app-rezultat-takmicenja',
  templateUrl: './rezultat-takmicenja.component.html',
  styleUrls: ['./rezultat-takmicenja.component.css']
})
export class RezultatTakmicenjaComponent implements OnInit {

  constructor(private sportistiServis:SportistiService,private osvojeneMedaljeServis:OsvojeneMedaljeService,
    private router:Router) { }

  ngOnInit(): void {
    this.raspored=JSON.parse(localStorage.getItem('raspored'));
    if (this.raspored.sportskaDisciplina=="50m trostav" ||
    this.raspored.sportskaDisciplina=="10m vazdusna puska" ||
    this.raspored.sportskaDisciplina=="25m malokalib. pistolj"|| 
    this.raspored.sportskaDisciplina=="10m vazdusni pistolj"){
      this.poruka="Napomena: Serije odvojiti sa ';' !";
    }else if (this.raspored.sportskaDisciplina=="100 metara trcanje" || 
    this.raspored.sportskaDisciplina=="200 metara trcanje" || 
    this.raspored.sportskaDisciplina=="400 metara trcanje"  ||
    this.raspored.sportskaDisciplina=="100m leptir" ||
    this.raspored.sportskaDisciplina=="200m slobodno"){
      this.poruka="Format unosa: SS,TT";
    } else if (this.raspored.sportskaDisciplina=="800 metara trcanje" ||
    this.raspored.sportskaDisciplina=="5000 metara trcanje" ||
    this.raspored.sportskaDisciplina=="10000 metara trcanje"){
      this.poruka="Format unosa: MM:SS,TT"
    } else if (this.raspored.sportskaDisciplina=="skok u vis" ||
    this.raspored.sportskaDisciplina=="skok u dalj" ||
    this.raspored.sportskaDisciplina=="troskok" || 
    this.raspored.sportskaDisciplina=="skok s motkom" ||
    this.raspored.sportskaDisciplina=="bacanje kugle" ||
    this.raspored.sportskaDisciplina=="bacanje diska" ||
    this.raspored.sportskaDisciplina=="bacanje koplja" ||
    this.raspored.sportskaDisciplina=="bacanje kladiva"){
      this.poruka="Format unosa: MM,SS; krugove odvajati sa ';'! "
    } else if (this.raspored.sportskaDisciplina=="maraton" ||
    this.raspored.sportskaDisciplina=="20km brzo hodanje" ||
    this.raspored.sportskaDisciplina=="50km brzo hodanje" ||
    this.raspored.sportskaDisciplina=="drumska trka 225km"){
      this.poruka="Format unosa: CC:MM:SS";
    }
    this.takmicari=this.raspored.ucesnici;
    if (this.raspored.sportskaDisciplina=="singl"){
      this.takmicari.sort((a,b)=> parseInt(a.rezultat)-parseInt(b.rezultat));
    }
  }

  odjaviSe(){
    localStorage.clear();
    this.router.navigate([""]);
  }
  raspored:Raspored;
  takmicari:Ucesnik[];
  zlato:Ucesnik;
  srebro:Ucesnik;
  bronza:Ucesnik;
  zemljaZlato:string;
  zemljaSrebro:string;
  zemljaBronza:string;
  osvojeneMedalje:osvojeneMedalje[]=[];
  poruka:string="";

  rezultat13S:string;
  rezultat24S:string;
  rezultat57S:string;
  rezultat68S:string;
  rezultatMedjuS:string;

  rezultatFinaleS:string;
  
  rezultat13pobednik:Ucesnik;
  rezultat13gubitnik:Ucesnik;
  rezultat24pobednik:Ucesnik;
  rezultat24gubitnik:Ucesnik;
  rezultat57pobednik:Ucesnik;
  rezultat57gubitnik:Ucesnik;
  rezultat68pobednik:Ucesnik;
  rezultat68gubitnik:Ucesnik;
  rezultat1357pobednik:Ucesnik;
  rezultat1357gubitnik:Ucesnik;
  rezultat2468pobednik:Ucesnik;
  rezultat2468gubitnik:Ucesnik;
  rezultatMedju:string;
  rezultatPolu1:string;
  rezultatPolu2:string;
  rezultatFinale:Ucesnik;
  zlatoTenis:Ucesnik;

  srebroTenis:Ucesnik;
  bronzaTenis:Ucesnik;


  unesiRezultate(){
    let prvi, drugi, treci;
    let id1, id2,id3;
    id1=id2=id3=-1;
    treci = prvi = drugi = "-1.01";
    let traziMax=true;
    if (this.raspored.sportskaDisciplina=="100 metara trcanje" || 
    this.raspored.sportskaDisciplina=="200 metara trcanje" || 
    this.raspored.sportskaDisciplina=="400 metara trcanje"){
      traziMax=false;
      for (let i=0;i<this.takmicari.length;i++){
        let rez=this.takmicari[i].rezultat.split(",");
        this.takmicari[i].rezultat=""+(parseFloat(rez[0])+parseFloat(rez[1])/100);
      }
    } else 
    if (this.raspored.sportskaDisciplina=="800 metara trcanje" ||
    this.raspored.sportskaDisciplina=="5000 metara trcanje" ||
    this.raspored.sportskaDisciplina=="10000 metara trcanje" ||
    this.raspored.sportskaDisciplina=="100m leptir" ||
    this.raspored.sportskaDisciplina=="200m slobodno"){
      traziMax=false;
      this.takmicari.forEach(element=>{
        let r1=element.rezultat.split(":"); //prvi clan minuta drugi SS,MM
        let r2=r1[1].split(",");
        element.rezultat=""+(parseFloat(r1[0])*60+parseFloat(r2[0])+parseFloat(r2[1])/100);
      })
    } else if (this.raspored.sportskaDisciplina=="skok u vis" ||
    this.raspored.sportskaDisciplina=="skok u dalj" ||
    this.raspored.sportskaDisciplina=="troskok" || 
    this.raspored.sportskaDisciplina=="skok s motkom" ||
    this.raspored.sportskaDisciplina=="bacanje kugle" ||
    this.raspored.sportskaDisciplina=="bacanje diska" ||
    this.raspored.sportskaDisciplina=="bacanje koplja" ||
    this.raspored.sportskaDisciplina=="bacanje kladiva"){
      traziMax=true;
      this.takmicari.forEach(element=>{
        let r=element.rezultat.split(";");//podeli se na tri pokusaja

        for (let i=0;i<r.length;i++){
          let mc=r[i].split(",");
          r[i]=mc[0]+"."+mc[1];
        }
        let max="-1";
        r.forEach(i=>{
          let m=parseFloat(max)
          let i1=parseFloat(i)
          if (m<i1){
            max=i;
          }
        })
        element.rezultat=""+max;
      })
    }else if (this.raspored.sportskaDisciplina=="maraton" ||
    this.raspored.sportskaDisciplina=="20km brzo hodanje" ||
    this.raspored.sportskaDisciplina=="50km brzo hodanje" ||
    this.raspored.sportskaDisciplina=="drumska trka 225km"){
      traziMax=false;
      this.takmicari.forEach(element => {
        let r=element.rezultat.split(":");
        element.rezultat=""+(parseFloat(r[0])*3600+parseFloat(r[1])*60+parseFloat(r[2]));
      });
    } else if (this.raspored.sportskaDisciplina=="50m trostav" ||
    this.raspored.sportskaDisciplina=="10m vazdusna puska" ||
    this.raspored.sportskaDisciplina=="25m malokalib. pistolj"|| 
    this.raspored.sportskaDisciplina=="10m vazdusni pistolj"){
      traziMax=true;
      this.takmicari.forEach(element=>{
        let r=element.rezultat.split(";");//podeli se na sest delova
        let sum=0;
        r.forEach(i=>{
          sum+=parseInt(i);
        })
        element.rezultat=""+sum;
      })
    }

    if (traziMax){
      for(let i = 0; i < this.takmicari.length; i++)
      {      
        if (parseFloat(this.takmicari[i].rezultat) > parseFloat(prvi))
        {
            treci = drugi;
            id3=id2;
            drugi = prvi;
            id2=id1;
            prvi = this.takmicari[i].rezultat;
            id1=i;
        }
        else if (parseFloat(this.takmicari[i].rezultat) > parseFloat(drugi))
        {
            treci = drugi;
            id3=id2;
            drugi = this.takmicari[i].rezultat;
            id2=i;
        }
        else if (parseFloat(this.takmicari[i].rezultat) > parseFloat(treci)){
          treci = this.takmicari[i].rezultat;
          id3=i;
        }
           
           
      }
    }else{
      //isti algoritam samo trazi najmanja tri
      treci = prvi = drugi = "100000001.01"; //prebaci u string
      for(let i = 0; i < this.takmicari.length; i++)
      {      
        if (parseFloat(this.takmicari[i].rezultat) < parseFloat(prvi))
        {
            treci = drugi;
            id3=id2;
            drugi = prvi;
            id2=id1;
            prvi = this.takmicari[i].rezultat;
            id1=i;
        }
        else if (parseFloat(this.takmicari[i].rezultat) < parseFloat(drugi))
        {
            treci = drugi;
            id3=id2;
            drugi = this.takmicari[i].rezultat;
            id2=i;
        }
        else if (parseFloat(this.takmicari[i].rezultat) < parseFloat(treci)){
          treci = this.takmicari[i].rezultat;
          id3=i;
        }
           
      }
    }

      if (prvi==drugi){
        this.bronza=this.takmicari[id3];
        let b=Math.random();
        if (b<0.5){
          this.zlato=this.takmicari[id1];
          this.srebro=this.takmicari[id2];
        } else {
          this.zlato=this.takmicari[id2];
          this.srebro=this.takmicari[id1];
        }
      } else if (drugi==treci){
        this.zlato=this.takmicari[id1];
        let b=Math.random();
        if (b<0.5){
          this.bronza=this.takmicari[id3];
          this.srebro=this.takmicari[id2];
        } else {
          this.bronza=this.takmicari[id2];
          this.srebro=this.takmicari[id3];
        }
      } else {
        if (this.takmicari.length>0){
          this.zlato=this.takmicari[id1];
        }
        if (this.takmicari.length>1){
          this.srebro=this.takmicari[id2];
        }
        if(this.takmicari.length>2){
          this.bronza=this.takmicari[id3];
        }
      }

    if (this.takmicari.length>0){
      this.sportistiServis.dohvatiSportistu(this.zlato.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
        this.zemljaZlato=s.zemlja;
        if(this.zemljaZlato!=null){
          this.osvojeneMedaljeServis.dodajZlato(this.zemljaZlato).subscribe(res=>{
            if (res['message']=='ok') alertify.success('zlato dodato');
          });
        }
        alertify.success("zlato ide"+s.zemlja+', takmicar '+s.imePrezime+'rezultat ='+prvi);
        if (s.osvajac=="ne") {
          this.sportistiServis.azurirajMedalje(this.zlato.ucesnik,this.raspored.sport).subscribe(res=>{
            if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
          })
        }
      });
    }
    if(this.takmicari.length>1){
      this.sportistiServis.dohvatiSportistu(this.srebro.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
        this.zemljaSrebro=s.zemlja;

        if(this.zemljaSrebro!=null){
          this.osvojeneMedaljeServis.dodajSrebro(this.zemljaSrebro).subscribe(res=>{
            if (res['message']=='ok') alertify.success('srebro dodato');
          });
        }

        alertify.success("srebro ide"+s.zemlja+', takmicar '+s.imePrezime+'rezultat ='+drugi);
        if (s.osvajac=="ne") {
          this.sportistiServis.azurirajMedalje(this.srebro.ucesnik,this.raspored.sport).subscribe(res=>{
            if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
          })
        }
      });
    }
    
    if(this.takmicari.length>2){
      this.sportistiServis.dohvatiSportistu(this.bronza.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
        this.zemljaBronza=s.zemlja;
        if (this.zemljaBronza!=null){
          this.osvojeneMedaljeServis.dodajBronzu(this.zemljaBronza).subscribe(res=>{
            if (res['message']=='ok') alertify.success('bronza dodata');
          });
        }
        alertify.success("bronza ide"+s.zemlja+', takmicar '+s.imePrezime+'rezultat ='+treci);
        if (s.osvajac=="ne") {
          this.sportistiServis.azurirajMedalje(this.bronza.ucesnik,this.raspored.sport).subscribe(res=>{
            if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
          })
        }
      });
    }

  }

  azurirajRang(){
    this.osvojeneMedaljeServis.dohvatiOsvojeneMedalje().subscribe((o:osvojeneMedalje[])=>{
      o.forEach(element => {
        element.ukupno=element.zlato+element.srebro+element.bronza;
      });
      this.osvojeneMedalje=o;
      for (let i=0;i<this.osvojeneMedalje.length-1;i++){
        for (let j=i+1;j<this.osvojeneMedalje.length;j++){
          if (this.osvojeneMedalje[i].ukupno<this.osvojeneMedalje[j].ukupno){
            let tmp=this.osvojeneMedalje[i];
            this.osvojeneMedalje[i]=this.osvojeneMedalje[j];
            this.osvojeneMedalje[j]=tmp;
          }
        }
      }
        for (let i=0;i<this.osvojeneMedalje.length;i++){
          this.osvojeneMedaljeServis.azurirajRang(this.osvojeneMedalje[i].zemlja,i+1).subscribe(res=>{
            if (res['message']=='ok') alertify.success('azuriran rang za zemlju '+this.osvojeneMedalje[i].zemlja+", rang: "+(i+1)
            +"ima medalja: "+this.osvojeneMedalje[i].ukupno);
          })
        }
    })
  }



drugiKrug=false;
  unesiRezPrviKrug4(){
    let prvi=this.rezultat13S.split(':');
    if (prvi[0]=="2"){
      this.rezultat13pobednik=this.takmicari[0];
    this.rezultat13gubitnik=this.takmicari[2];}
    else {
      this.rezultat13pobednik=this.takmicari[2];
      this.rezultat13gubitnik=this.takmicari[0];
    }
    prvi=this.rezultat24S.split(":");
    if (prvi[0]=="2"){
      this.rezultat24pobednik=this.takmicari[1];
    this.rezultat24gubitnik=this.takmicari[3];}
    else {
      this.rezultat24pobednik=this.takmicari[3];
      this.rezultat24gubitnik=this.takmicari[1];
    }
    this.drugiKrug=true;
  }

  unesiRezPrviKrug8(){
    let prvi=this.rezultat13S.split(':');
    if (prvi[0]=="2"){
      this.rezultat13pobednik=this.takmicari[0];
    this.rezultat13gubitnik=this.takmicari[2];}
    else {
      this.rezultat13pobednik=this.takmicari[2];
      this.rezultat13gubitnik=this.takmicari[0];
    }
    prvi=this.rezultat24S.split(":");
    if (prvi[0]=="2"){
      this.rezultat24pobednik=this.takmicari[1];
    this.rezultat24gubitnik=this.takmicari[3];}
    else {
      this.rezultat24pobednik=this.takmicari[3];
      this.rezultat24gubitnik=this.takmicari[1];
    }
    prvi=this.rezultat57S.split(":");
    if (prvi[0]=="2"){
      this.rezultat57pobednik=this.takmicari[4];
    this.rezultat57gubitnik=this.takmicari[6];}
    else {
      this.rezultat57pobednik=this.takmicari[6];
      this.rezultat57gubitnik=this.takmicari[4];
    }
    prvi=this.rezultat68S.split(":");
    if (prvi[0]=="2"){
      this.rezultat68pobednik=this.takmicari[5];
    this.rezultat68gubitnik=this.takmicari[7];}
    else {
      this.rezultat68pobednik=this.takmicari[7];
      this.rezultat68gubitnik=this.takmicari[5];
    }
    this.drugiKrug=true;
  }

  treciKrug:boolean=false;
  unesiRezDrugiKrug8(){
    let prvi=this.rezultatPolu1.split(':');
    if (prvi[0]=="2"){
      this.rezultat1357pobednik=this.rezultat13pobednik;
    this.rezultat1357gubitnik=this.rezultat57pobednik;}
    else {
      this.rezultat1357pobednik=this.rezultat57pobednik;
      this.rezultat1357gubitnik=this.rezultat13pobednik;
    }
    prvi=this.rezultat24S.split(":");
    if (prvi[0]=="2"){
      this.rezultat2468pobednik=this.rezultat24pobednik;
    this.rezultat2468gubitnik=this.rezultat68pobednik;}
    else {
      this.rezultat2468pobednik=this.rezultat68pobednik;
      this.rezultat2468gubitnik=this.rezultat24pobednik;
    }
    prvi=this.rezultat57S.split(":");
 
    this.treciKrug=true;
  }

  unesiRezTreciKrug8(){
    let prvi=this.rezultatFinaleS.split(':');
    if (prvi[0]=="2"){
      this.zlatoTenis=this.rezultat1357pobednik;
      this.srebroTenis=this.rezultat2468pobednik;
    }else{
      this.srebroTenis=this.rezultat1357pobednik;
      this.zlatoTenis=this.rezultat2468pobednik;
    }
    prvi=this.rezultatMedjuS.split(":");
    if(prvi[0]=="2") this.bronzaTenis=this.rezultat1357gubitnik;
    else this.bronzaTenis=this.rezultat2468gubitnik;
    
    this.sportistiServis.dohvatiSportistu(this.zlatoTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaZlato=s.zemlja;
      if(this.zemljaZlato!=null){
        this.osvojeneMedaljeServis.dodajZlato(this.zemljaZlato).subscribe(res=>{
          if (res['message']=='ok') alertify.success('zlato dodato');
        });
      }
      alertify.success("zlato ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.zlatoTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });

    this.sportistiServis.dohvatiSportistu(this.srebroTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaSrebro=s.zemlja;
      if(this.zemljaSrebro!=null){
        this.osvojeneMedaljeServis.dodajSrebro(this.zemljaSrebro).subscribe(res=>{
          if (res['message']=='ok') alertify.success('srebro dodato');
        });
      }
      alertify.success("srebro ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.srebroTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });


    this.sportistiServis.dohvatiSportistu(this.bronzaTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaBronza=s.zemlja;
      if (this.zemljaBronza!=null){
        this.osvojeneMedaljeServis.dodajBronzu(this.zemljaBronza).subscribe(res=>{
          if (res['message']=='ok') alertify.success('bronza dodata');
        });
      }
      alertify.success("bronza ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.bronzaTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });
  }



  unesiRezDrugiKrug4(){
    let prvi=this.rezultatFinaleS.split(':');
    if (prvi[0]=="2"){
      this.zlatoTenis=this.rezultat13pobednik;
      this.srebroTenis=this.rezultat24pobednik;
    }else{
      this.srebroTenis=this.rezultat13pobednik;
      this.zlatoTenis=this.rezultat24pobednik;
    }
    prvi=this.rezultatMedjuS.split(":");
    if(prvi[0]=="2") this.bronzaTenis=this.rezultat13gubitnik;
    else this.bronzaTenis=this.rezultat24gubitnik;
    
    this.sportistiServis.dohvatiSportistu(this.zlatoTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaZlato=s.zemlja;
      if(this.zemljaZlato!=null){
        this.osvojeneMedaljeServis.dodajZlato(this.zemljaZlato).subscribe(res=>{
          if (res['message']=='ok') alertify.success('zlato dodato');
        });
      }
      alertify.success("zlato ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.zlatoTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });

    this.sportistiServis.dohvatiSportistu(this.srebroTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaSrebro=s.zemlja;
      if(this.zemljaSrebro!=null){
        this.osvojeneMedaljeServis.dodajSrebro(this.zemljaSrebro).subscribe(res=>{
          if (res['message']=='ok') alertify.success('srebro dodato');
        });
      }
      alertify.success("srebro ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.srebroTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });


    this.sportistiServis.dohvatiSportistu(this.bronzaTenis.ucesnik,this.raspored.sport).subscribe((s:Sportista)=>{
      this.zemljaBronza=s.zemlja;
      if (this.zemljaBronza!=null){
        this.osvojeneMedaljeServis.dodajBronzu(this.zemljaBronza).subscribe(res=>{
          if (res['message']=='ok') alertify.success('bronza dodata');
        });
      }
      alertify.success("bronza ide"+s.zemlja+', takmicar '+s.imePrezime);
      if (s.osvajac=="ne") {
        this.sportistiServis.azurirajMedalje(this.bronzaTenis.ucesnik,this.raspored.sport).subscribe(res=>{
          if (res['message']=='ok') alertify.success('azuriran osvajac sportista');
        })
      }
    });
  }




}

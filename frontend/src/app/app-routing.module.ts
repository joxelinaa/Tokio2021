import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatTakmicenjaComponent } from './delegat-takmicenja/delegat-takmicenja.component';
import { KorisnickiZahteviComponent } from './korisnicki-zahtevi/korisnicki-zahtevi.component';
import { LoginComponent } from './login/login.component';
import { NeregistrovanKorisnikComponent } from './neregistrovan-korisnik/neregistrovan-korisnik.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PregledDosadasnjihRekordaComponent } from './pregled-dosadasnjih-rekorda/pregled-dosadasnjih-rekorda.component';
import { PregledOsvojenihMedaljaComponent } from './pregled-osvojenih-medalja/pregled-osvojenih-medalja.component';
import { PregledZemaljaUcesnicaComponent } from './pregled-zemalja-ucesnica/pregled-zemalja-ucesnica.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { RegisterComponent } from './register/register.component';
import { RezultatTakmicenjaComponent } from './rezultat-takmicenja/rezultat-takmicenja.component';
import { VodjaNacionalneDelegacijeComponent } from './vodja-nacionalne-delegacije/vodja-nacionalne-delegacije.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:"organizator", component:OrganizatorComponent},
  {path:"delegat", component:DelegatTakmicenjaComponent},
  {path:"vodja nacionalne delegacije", component:VodjaNacionalneDelegacijeComponent},
  {path:"register", component:RegisterComponent},
  {path:'promeni-lozinku', component:PromeniLozinkuComponent},
  {path:"pregled-dosadasnjih-rekorda", component:PregledDosadasnjihRekordaComponent},
  {path:'neregistrovan-korisnik',component:NeregistrovanKorisnikComponent},
  {path:'pregled-zemalja-ucesnica', component:PregledZemaljaUcesnicaComponent},
  {path:'pregled-osvojenih-medalja', component:PregledOsvojenihMedaljaComponent},
  {path:'korisnicki-zahtevi', component:KorisnickiZahteviComponent},
  {path:'rezultat-takmicenja',component:RezultatTakmicenjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

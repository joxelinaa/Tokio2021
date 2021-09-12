import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { OrganizatorComponent } from './organizator/organizator.component';
import { DelegatTakmicenjaComponent } from './delegat-takmicenja/delegat-takmicenja.component';
import { VodjaNacionalneDelegacijeComponent } from './vodja-nacionalne-delegacije/vodja-nacionalne-delegacije.component';
import { HttpClientModule } from '@angular/common/http';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { PregledDosadasnjihRekordaComponent } from './pregled-dosadasnjih-rekorda/pregled-dosadasnjih-rekorda.component';
import { NeregistrovanKorisnikComponent } from './neregistrovan-korisnik/neregistrovan-korisnik.component';
import { PregledZemaljaUcesnicaComponent } from './pregled-zemalja-ucesnica/pregled-zemalja-ucesnica.component';
import { PregledOsvojenihMedaljaComponent } from './pregled-osvojenih-medalja/pregled-osvojenih-medalja.component';
import { KorisnickiZahteviComponent } from './korisnicki-zahtevi/korisnicki-zahtevi.component';
import { RezultatTakmicenjaComponent } from './rezultat-takmicenja/rezultat-takmicenja.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OrganizatorComponent,
    DelegatTakmicenjaComponent,
    VodjaNacionalneDelegacijeComponent,
    PromeniLozinkuComponent,
    PregledDosadasnjihRekordaComponent,
    NeregistrovanKorisnikComponent,
    PregledZemaljaUcesnicaComponent,
    PregledOsvojenihMedaljaComponent,
    KorisnickiZahteviComponent,
    RezultatTakmicenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

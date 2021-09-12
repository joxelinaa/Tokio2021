import { Delegat } from "./delegat";
import { Lokacija } from "./lokacija";
import { Ucesnik } from "./ucesnik";

export class Takmicenje{
    sport:string;
    sportskaDisciplina:string;
    vrsta:string;
    format:string;
    pol:string;
    pocetak:string;
    kraj:string;
    lokacije:Array<Lokacija>;
    ucesnici:Array<Ucesnik>;
    delegati:Array<Delegat>;
    unetRaspored:string;
}
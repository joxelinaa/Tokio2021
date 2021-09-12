import { Ucesnik } from "./ucesnik";

export class Raspored{
    sport:string;
    sportskaDisciplina:string;
    datum:string;
    vreme:string;
    lokacija:string;
    ucesnici:Array<Ucesnik>;
    pol:string;
}
import express from "express";
import { korisnickiZahtevController } from "../controllers/korisnickiZahtev.controller";

const korisnickiZahtevRouter=express.Router();

korisnickiZahtevRouter.route('/dodajZahtev').post(
    (req,res)=>new korisnickiZahtevController().dodajZahtev(req,res)
);

korisnickiZahtevRouter.route('/dohvatiSveZahteve').get(
    (req,res)=>new korisnickiZahtevController().dohvatiSveKorisnickeZahteve(req,res)
);
korisnickiZahtevRouter.route('/obrisiZahtev').post(
    (req,res)=>new korisnickiZahtevController().obrisiZahtev(req,res)
);




export default korisnickiZahtevRouter;
import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korisnikRouter=express.Router();

korisnikRouter.route('/login').post(
    (req,res)=>new KorisnikController().login(req,res)
);

korisnikRouter.route('/promeniLozinku').post(
    (req,res)=>new KorisnikController().promeniLozinku(req,res)
);
/*
korisnikRouter.route('/register').post(
    (req,res)=>new KorisnikController().register(req,res)
);
*/

korisnikRouter.route('/dohvatiDelegate').get(
    (req,res)=>new KorisnikController().dohvatiDelegate(req,res)
);


korisnikRouter.route('/azurirajNadgledanjeDelegata').post(
    (req,res)=>new KorisnikController().azurirajNadgledanjeDelegata(req,res)
);

korisnikRouter.route('/proveriDaLiPostojiVodja').post(
    (req,res)=>new KorisnikController().proveriDaLiPostojiVodja(req,res)
);

korisnikRouter.route('/dodajKorisnika').post(
    (req,res)=>new KorisnikController().dodajKorisnika(req,res)
);

export default korisnikRouter;
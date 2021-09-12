import express from "express";
import { SportistiController } from "../controllers/sportisti.controller";


const sportistiRouter=express.Router();

sportistiRouter.route('/dodajSportistu').post(
    (req,res)=>new SportistiController().dodajSportistu(req,res)
)
sportistiRouter.route('/dohvatiSportisteZaTakmicenje').post(
    (req,res)=>new SportistiController().dohvatiSportisteZaTakmicenje(req,res)
)
sportistiRouter.route('/dohvatiSveSportiste').get(
    (req,res)=>new SportistiController().dohvatiSveSportiste(req,res)
);
sportistiRouter.route('/dohvatiBrojSportistaIzDateZemlje').post(
    (req,res)=>new SportistiController().dohvatiBrojSportistaIzDateZemlje(req,res)
)

sportistiRouter.route('/pretraziSportiste').post(
    (req,res)=>new SportistiController().pretraziSportiste(req,res)
)

sportistiRouter.route('/dohvatiSportistu').post(
    (req,res)=>new SportistiController().dohvatiSportistu(req,res)
)

sportistiRouter.route('/azurirajMedalje').post(
    (req,res)=>new SportistiController().azurirajMedalje(req,res)
)


export default sportistiRouter;
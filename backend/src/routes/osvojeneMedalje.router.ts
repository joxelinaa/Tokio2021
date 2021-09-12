import express from "express";
import { OsvojeneMedaljeController } from "../controllers/osvojeneMedalje.controller";

const osvojeneMedaljeRouter=express.Router();

osvojeneMedaljeRouter.route('/dohvatiOsvojeneMedalje').get(
    (req,res)=>new OsvojeneMedaljeController().dohvatiOsvojeneMedalje(req,res)
);

osvojeneMedaljeRouter.route('/dodajZlato').post(
    (req,res)=>new OsvojeneMedaljeController().dodajZlato(req,res)
);

osvojeneMedaljeRouter.route('/dodajSrebro').post(
    (req,res)=>new OsvojeneMedaljeController().dodajSrebro(req,res)
);

osvojeneMedaljeRouter.route('/dodajBronzu').post(
    (req,res)=>new OsvojeneMedaljeController().dodajBronzu(req,res)
);

osvojeneMedaljeRouter.route('/azurirajRang').post(
    (req,res)=>new OsvojeneMedaljeController().azurirajRang(req,res)
);
export default osvojeneMedaljeRouter;
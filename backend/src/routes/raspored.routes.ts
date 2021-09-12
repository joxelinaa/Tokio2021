import express from "express";
import { RasporedController } from "../controllers/raspored.controller";

const rasporedRouter=express.Router();

rasporedRouter.route('/unesiRaspored').post(
    (req,res)=>new RasporedController().unesiRaspored(req,res)
);


rasporedRouter.route('/proveriLokacijuIVreme').post(
    (req,res)=>new RasporedController().proveriLokacijuIVreme(req,res)
);

rasporedRouter.route('/dohvatiRasporede').get(
    (req,res)=>new RasporedController().dohvatiRasporede(req,res)
);


export default rasporedRouter;
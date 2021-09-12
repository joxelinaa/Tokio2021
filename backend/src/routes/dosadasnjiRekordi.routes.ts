import express from "express";
import { DosadasnjiRekordiController } from "../controllers/dosadasnjiRekordi.controller";


const dosadasnjiRekordiRouter=express.Router();

dosadasnjiRekordiRouter.route('/dohvatiDosadasnjeRekorde').get(
    (req,res)=>new DosadasnjiRekordiController().dohvatiRekorde(req,res)
);

export default dosadasnjiRekordiRouter;
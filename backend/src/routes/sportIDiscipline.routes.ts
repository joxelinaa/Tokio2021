import express from "express";
import { sportIDisciplinaController } from "../controllers/sportIDisciplina.controller";


const sportIDisciplineRouter=express.Router();

sportIDisciplineRouter.route('/ubaciSportIDisciplinu').post(
    (req,res)=>new sportIDisciplinaController().ubaciSportIDisciplinu(req,res)
);

sportIDisciplineRouter.route('/prikaziDiscipline').post(
    (req,res)=>new sportIDisciplinaController().prikaziDiscipline(req,res)
);

sportIDisciplineRouter.route('/prikaziSveSportove').get(
    (req,res)=>new sportIDisciplinaController().prikaziSveSportove(req,res)
);


sportIDisciplineRouter.route('/prikaziEkipneDiscipline').post(
    (req,res)=>new sportIDisciplinaController().prikaziEkipneDiscipline(req,res)
);



export default sportIDisciplineRouter;
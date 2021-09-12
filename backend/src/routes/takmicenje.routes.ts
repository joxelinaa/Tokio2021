import express from "express";
import { TakmicenjeController } from "../controllers/takmicenje.controller";


const takmicenjaRouter=express.Router();

takmicenjaRouter.route('/unesiIndividualnoTakmicenje').post(
    (req,res)=>new TakmicenjeController().unesiTakmicenje(req,res)
);


takmicenjaRouter.route('/unesiEkipnoTakmicenje').post(
    (req,res)=>new TakmicenjeController().unesiTakmicenje(req,res)
);


takmicenjaRouter.route('/postojiTakmicenje').post(
    (req,res)=>new TakmicenjeController().postojiTakmicenje(req,res)
);

takmicenjaRouter.route('/dohvatiSvaTakmicenjaBezUnetogRasporeda').get(
    (req,res)=>new TakmicenjeController().dohvatiSvaTakmicenjaBezUnetogRasporeda(req,res)
);

takmicenjaRouter.route('/azurirajRasporedTakmicenja').post(
    (req,res)=>new TakmicenjeController().azurirajRasporedTakmicenja(req,res)
);


takmicenjaRouter.route('/dohvatiSvaTakmicenja').get(
    (req,res)=>new TakmicenjeController().dohvatiSvaTakmicenja(req,res)
);

export default takmicenjaRouter;
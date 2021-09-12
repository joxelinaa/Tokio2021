import express from "express";
import osvojeneMedalje from "../models/osvojeneMedalje";

export class OsvojeneMedaljeController{
    dohvatiOsvojeneMedalje=(req:express.Request,res:express.Response)=>{
        osvojeneMedalje.find({},(err,rez)=>{
            if (err) console.log(err);
            else res.json(rez);
        })
    }

    dodajZlato=(req:express.Request,res:express.Response)=>{
        let zemlja=req.body.zemlja;
        osvojeneMedalje.collection.updateOne({'zemlja':zemlja},{$inc:{'zlato':1}});
         res.json({'message':'ok'});
        
    }

    dodajSrebro=(req:express.Request,res:express.Response)=>{
        let zemlja=req.body.zemlja;
        osvojeneMedalje.collection.updateOne({'zemlja':zemlja},{$inc:{'srebro':1}});
            res.json({'message':'ok'});
        
    }

    dodajBronzu=(req:express.Request,res:express.Response)=>{
        let zemlja=req.body.zemlja;
        osvojeneMedalje.collection.updateOne({'zemlja':zemlja},{$inc:{'bronza':1}});
            res.json({'message':'ok'});
        
    }

    azurirajRang=(req:express.Request,res:express.Response)=>{
        let zemlja=req.body.zemlja;
        let rang=req.body.rang;
        osvojeneMedalje.collection.updateOne({'zemlja':zemlja},{$set:{'rang':rang}});
             res.json({'message':'ok'});
    }
}
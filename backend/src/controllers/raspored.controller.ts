import express from "express";
import raspored from "../models/raspored";


export class RasporedController{
    unesiRaspored=(req:express.Request, res:express.Response)=>{
        raspored.find({},(err,r)=>{
            if (err) console.log(err);
            else {
                let n=new raspored(req.body);
                n.save().then(n=>{
                    res.json({'message':"ok"})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    proveriLokacijuIVreme=(req:express.Request, res:express.Response)=>{
        let datum=req.body.datum;
        let lokacija=req.body.lokacija;
        let vreme=req.body.vreme;
        raspored.findOne({"vreme":vreme, "lokacija":lokacija,"datum":datum},(err,r)=>{
            if (err) console.log(err);
            else res.json(r);
        })
    }

    dohvatiRasporede=(req:express.Request, res:express.Response)=>{
        raspored.find({},(err,r)=>{
            if (err) console.log(err);
            else res.json(r);
        })
    }
}
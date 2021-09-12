import express from "express";
import takmicenja from "../models/takmicenja";

export class TakmicenjeController{
    unesiTakmicenje=(req:express.Request, res:express.Response)=>{
        takmicenja.find({},(err,sd)=>{
            if (err) console.log(err);
            else {
                let n=new takmicenja(req.body);
                n.save().then(n=>{
                    res.json({'message':"ok"})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    postojiTakmicenje=(req:express.Request, res:express.Response)=>{
        let sport=req.body.sport;
        let disciplina=req.body.sportskaDisciplina;
        let pol=req.body.pol;
        takmicenja.findOne({'sport':sport, 'sportskaDisciplina':disciplina,"pol":pol},(err,takm)=>{
            if (err) console.log(err);
            else res.json(takm);
        })
    }

    dohvatiSvaTakmicenjaBezUnetogRasporeda=(req:express.Request, res:express.Response)=>{
        takmicenja.find({'unetRaspored':"ne"},(err,r)=>{
            if (err) console.log(err);
            else res.json(r);
        })
    }

    azurirajRasporedTakmicenja=(req:express.Request, res:express.Response)=>{
        let sport=req.body.sport;
        let disciplina=req.body.sportskaDisciplina;
        let pol=req.body.pol;
        let r="da"
        takmicenja.collection.updateOne({"sport":sport,"sportskaDisciplina":disciplina,"pol":pol},{$set:{'unetRaspored':r}},(err,rez)=>{
            if (err) console.log(err);
            else res.json({'message':"ok"});
        })
    }

    dohvatiSvaTakmicenja=(req:express.Request, res:express.Response)=>{
        takmicenja.find({},(err,r)=>{
            if (err) console.log(err);
            else res.json(r);
        })
    }
}
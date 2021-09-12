import express from "express";
import sportIDisciplina from "../models/sportIDisciplina";

export class sportIDisciplinaController{
    ubaciSportIDisciplinu=(req:express.Request, res:express.Response)=>{
        sportIDisciplina.find({},(err,sd)=>{
            if (err) console.log(err);
            else {
                let n=new sportIDisciplina(req.body);
                n.save().then(n=>{
                    res.json({'message':"ok"})
                }).catch(err=>{
                    res.json(err);
                })
            }
        })
    }

    prikaziDiscipline=(req:express.Request, res:express.Response)=>{
        let sport=req.body.sport;
        sportIDisciplina.find({'sport':sport,"vrsta":"individ"},(err, discipline)=>{
            if (err) console.log(err);
            else res.json(discipline);
        })
    }



    prikaziEkipneDiscipline=(req:express.Request, res:express.Response)=>{
        let sport=req.body.sport;
        sportIDisciplina.find({'sport':sport,"vrsta":"ekipni"},(err, discipline)=>{
            if (err) console.log(err);
            else res.json(discipline);
        })
    }
    prikaziSveSportove=(req:express.Request, res:express.Response)=>{
        sportIDisciplina.find({},(err, ress)=>{
            if (err) console.log(err);
            else res.json(ress);
        })
    }
}
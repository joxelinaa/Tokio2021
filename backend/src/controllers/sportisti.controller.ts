import express, { json } from "express";
import { Request, Response } from "express-serve-static-core";
import sportisti from "../models/sportisti";

export class SportistiController{

    dodajSportistu=(req:express.Request,res:express.Response)=>{
        let imePrezime=req.body.imePrezime;
        let zemlja=req.body.zemlja;
        let pol=req.body.pol;
        let disciplina=req.body.sportskaDisciplina;
        let sport=req.body.sport;
        sportisti.findOne({'imePrezime':imePrezime, 'sport':sport, 'zemlja':zemlja, 'pol':pol},(err,sportista)=>{
            if (err) console.log(err);
            else {
                if (sportista){
                    //sportista vec postoji, treba mu samo dodati disciplinu
                    let d=disciplina.disciplina;
                    sportisti.findOne({'imePrezime':imePrezime, 'sport':sport, 'zemlja':zemlja, 'pol':pol,'sportskaDisciplina.disciplina':d},(err,rez)=>{
                        if (err) console.log(err);
                        else {
                            if (rez){
                                //ova disciplina je vec uneta
                                res.json({'message':"disciplina postoji"})
                            } else{
                               
                                sportisti.collection.updateOne({'imePrezime':imePrezime, 'sport':sport, 'zemlja':zemlja, 'pol':pol},
                                {$push:{'sportskaDisciplina':disciplina}});
                                res.json({'message':"ok"})
                            }
                        }
                    })
                } else{
                    //sportista ne postoji, dodaje se u bazu
                    let n=new sportisti(req.body);
                    n.save().then(n=>{
                        res.json({'message':"ok"})
                    }).catch(err=>{
                        res.json(err);
                    })
                }
               
            }
        })
    }

    dohvatiSportisteZaTakmicenje=(req:express.Request,res:express.Response)=>{
        let sport=req.body.sport;
        let pol=req.body.pol;
        sportisti.find({"sport":sport, "pol":pol},(err,niz)=>{
            if (err) console.log(err);
            else res.json(niz);
        })
    }

    dohvatiSveSportiste=(req:express.Request,res:express.Response)=>{
        sportisti.find({},(err,r)=>{
            if (err) console.log(err);
            else res.json(r);
        })
    }

    dohvatiBrojSportistaIzDateZemlje=(req:express.Request,res:express.Response)=>{
        let zemlja=req.body.zemlja;
        sportisti.find({'zemlja':zemlja},(err,niz)=>{
            if (err) console.log(err);
            else res.json(niz.length);
        });
    }
    

    dohvatiSportistu=(req:express.Request,res:express.Response)=>{
        let imePrezime=req.body.imePrezime;
        let sport=req.body.sport;
        sportisti.findOne({'imePrezime':imePrezime,"sport":sport},(err,s)=>{
            if (err) console.log(err);
            else res.json(s);
        })
    }

    azurirajMedalje=(req:express.Request,res:express.Response)=>{
        let imePrezime=req.body.imePrezime;
        let sport=req.body.sport;
        sportisti.updateOne({'imePrezime':imePrezime,"sport":sport},{$set:{"osvajac":"da"}},(err,s)=>{
            if (err) console.log(err);
            else res.json({'message':'ok'})
        })
    }


    pretraziSportiste=(req:express.Request,res:express.Response)=>{
        let imePrezime=req.body.imePrezime;
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let zemlja=req.body.zemlja;
        let pol=req.body.pol;
        let osvajac=req.body.osvajac;
        if (imePrezime!=null && imePrezime!=""){
            //provera prezime
            if (sport!=null && sport!='svi sportovi'){
                //proverava sport 
                    //ne proverava disciplinu
                    if (zemlja!=null && zemlja!='sve zemlje'){
                        //proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,
                                'zemlja':zemlja,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,
                                'zemlja':zemlja,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,
                                'zemlja':zemlja,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,
                                'zemlja':zemlja},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    } else {
                        //ne proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,"sport":sport},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    }
                
            }else {
                //ne proverava sport 
                    //ne proverava disciplinu
                    if (zemlja!=null && zemlja!='sve zemlje'){
                        //proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,
                                'zemlja':zemlja,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,
                                'zemlja':zemlja,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,
                                'zemlja':zemlja,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,
                                'zemlja':zemlja},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    } else {
                        //ne proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'imePrezime':imePrezime,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'imePrezime':imePrezime},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    }
                
            }
        }else {
            // ne provera prezime
            if (sport!=null && sport!='svi sportovi'){
                //proverava sport
                    //ne proverava disciplinu
                    if (zemlja!=null && zemlja!='sve zemlje'){
                        //proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({"sport":sport,
                                'zemlja':zemlja,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                sportisti.find({"sport":sport,
                                'zemlja':zemlja,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({"sport":sport,
                                'zemlja':zemlja,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                sportisti.find({"sport":sport,
                                'zemlja':zemlja},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    } else {
                        //ne proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({"sport":sport,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({"sport":sport,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({"sport":sport,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({"sport":sport},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    }
                
            }else {
                //ne proverava sport
                    //ne proverava disciplinu
                    if (zemlja!=null && zemlja!='sve zemlje'){
                        //proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({
                                'zemlja':zemlja,'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({
                                'zemlja':zemlja,'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({
                                'zemlja':zemlja,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({
                                'zemlja':zemlja},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    } else {
                        //ne proverava zemlju
                        if (pol!=null){
                            //proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'pol':pol,'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({'pol':pol},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }else {
                            //ne proverava pol
                            if (osvajac=='da'){
                                //proverava osvajace
                                sportisti.find({'osvajac':osvajac},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }else{
                                //ne proverava osvajace
                                sportisti.find({},(err,rez)=>{
                                    if (err) console.log(err);
                                    else res.json(rez);
                                });
                            }
                        }
                    }
                
            }
        }
    }
}
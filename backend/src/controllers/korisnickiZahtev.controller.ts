import express from "express";
import KorisnickiZahtev from "../models/korisnickiZahtevi";

import Korisnik from "../models/korisnici";
import korisnickiZahtevi from "../models/korisnickiZahtevi";

export class korisnickiZahtevController{
    dodajZahtev=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        let password1=req.body.password1;
        if (password==password1){
            Korisnik.findOne({"username":username},(err,user)=>{
                if (err) console.log(err);
                else {
                    if (user){
                        //postoji taj username
                        res.status(200).json({'message':'user exists'});
                    }else{
                        //ne postoji taj username
                        let user=new KorisnickiZahtev(req.body);
                        user.save().then((user)=>{
                            res.status(200).json({'message':'user added'});
                        }).catch((err)=>{
                            res.status(400).json({'message':'err'});
                        })
                        
                    }
                }
            })
        } else{
            //lozinka i ponovljena lozinka nisu iste
            res.status(200).json({'message':'bad password'});
        }
    }

    dohvatiSveKorisnickeZahteve=(req:express.Request,res:express.Response)=>{
        korisnickiZahtevi.find({},(err,rez)=>{
            if (err) console.log(err);
            else res.json(rez);
        })
    }
    
    obrisiZahtev=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        korisnickiZahtevi.collection.deleteOne({'username':username},(err,rez)=>{
            if (err) console.log(err);
            else res.json({'message':'ok'});
        })
    }
}


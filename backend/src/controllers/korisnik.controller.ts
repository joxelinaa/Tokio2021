import express from "express";
import korisnici from "../models/korisnici";

import Korisnik from "../models/korisnici";

export class KorisnikController{
    login=(req:express.Request, res:express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        let tip=req.body.tip;
        Korisnik.findOne({"username":username, "password":password, "tip":tip },(err,user)=>{
            if (err) console.log(err);
            else res.json(user);
        })
    }

    promeniLozinku=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let old_password=req.body.old_password;
        let new_password=req.body.new_password;
        if (old_password!=new_password){
            Korisnik.findOne({"username":username, "password":old_password, },(err,user)=>{
                if (err) console.log(err);
                else {
                    if (user){
                        Korisnik.collection.updateOne({'username':username},{$set:{'password':new_password}});
                        res.status(200).json({'message':'ok'});
                    } 
                    else res.status(200).json({'message':'ne postoji korisnik'});
                }
            })
        }
        else {
            res.status(200).json({'message':'iste lozinke'});
        }
       
    }

    dohvatiDelegate=(req:express.Request,res:express.Response)=>{
        Korisnik.find({'tip':'delegat'},(err,rez)=>{
            if (err) console.log(err);
            else res.json(rez);
        })
    }

    azurirajNadgledanjeDelegata=(req:express.Request,res:express.Response)=>{
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        korisnici.collection.updateOne
        Korisnik.collection.updateOne({'ime':ime, 'prezime':prezime, "tip":'delegat'},{$inc:{'nadgleda':1}},(err,rez)=>{
            if (err) console.log(err);
            else res.json({'message':'ok'})
        });
        
    }

    proveriDaLiPostojiVodja=(req:express.Request,res:express.Response)=>{
        let nacionalnost=req.body.nacionalnost;
        Korisnik.findOne({'nacionalnost':nacionalnost,'tip':'vodja nacionalne delegacije'},(err,rez)=>{
            if (err) console.log(err);
            else res.json(rez);
        })
    }
    dodajKorisnika=(req:express.Request,res:express.Response)=>{
        let user=new Korisnik(req.body);
        user.save().then((user)=>{
            res.status(200).json({'message':'user added'});
        }).catch((err)=>{
            res.status(400).json({'message':'err'});
        })
    }
}
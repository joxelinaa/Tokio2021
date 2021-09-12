import express from "express";
import dosadanjiRekordi from "../models/dosadanjiRekordi";

export class DosadasnjiRekordiController{
    dohvatiRekorde=(req:express.Request, res:express.Response)=>{
        dosadanjiRekordi.find({},(err,rekordi)=>{
            if (err) console.log(err);
            else res.json(rekordi);
        })
    }
}
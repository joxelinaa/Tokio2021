import mongoose from "mongoose";

const Schema=mongoose.Schema;

let DosadasnjiRekord=new Schema(
    {
        godina:{
            type:String
        },
        mesto:{
            type:String
        },
        sportskaDisciplina:{
            type:String
         },
         takmicar:{
             type:String
         },
         nacionalnost:{
             type:String
         },
         vremeIDuzina:{
             type:String
         }
    }
);

export default mongoose.model("DosadasnjiRekord", DosadasnjiRekord,"dosadasnjiRekordi");

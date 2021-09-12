import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Takmicenje=new Schema(
    {
        sport:{
            type:String
        },
        sportskaDisciplina:{
            type:String
        },
        vrsta:{
            type:String
         },
        format:{
             type:String
         },
        pol:{
            type:String
        },
        pocetak:{
            type:String
        },
        kraj:{
            type:String
        },
        lokacije:{
            type:Array
        },
        ucesnici:{
            type:Array
        },
        delegati:{
            type:Array
        },
        unetRaspored:{
            type:String
        }
    }
);

export default mongoose.model("takmicenje", Takmicenje,"takmicenja");

import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Raspored=new Schema(
    {
        sport:{
            type:String
        },
        sportskaDisciplina:{
            type:String
        },
        datum:{
            type:String
        },
        vreme:{
            type:String
        },
        lokacija:{
            type:String
        },
        ucesnici:{
            type:Array
        },
        pol:{
            type:String
        }
    }
);

export default mongoose.model("raspored", Raspored,"raspored");

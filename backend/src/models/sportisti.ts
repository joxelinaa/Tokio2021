import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Sportista=new Schema(
    {
        imePrezime:{
            type:String
        },
        zemlja:{
            type:String
        },
        sport:{
            type:String
         },
        sportskaDisciplina:{
             type:Array
         },
        pol:{
            type:String
        },
        osvajac:{
            type:String
        }
    }
);

export default mongoose.model("sportista", Sportista,"sportisti");

import mongoose from "mongoose";

const Schema=mongoose.Schema;

let sportIDisciplina=new Schema(
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
         brojIgraca:{
             type:String
         }
    }
);

export default mongoose.model("sportIDisciplina", sportIDisciplina,"sportIDiscipline");

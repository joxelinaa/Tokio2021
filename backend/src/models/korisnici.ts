import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Korisnik=new Schema(
    {
        username:{
            type:String
        },
        password:{
            type:String
        },
        ime:{
            type:String
         },
         prezime:{
             type:String
         },
         nacionalnost:{
             type:String
         },
         email:{
             type:String
         },
         tip:{
             type:String
         },
         nadgleda:{
             type:Number
         }
    }
);

export default mongoose.model("Korisnik", Korisnik,"korisnici");

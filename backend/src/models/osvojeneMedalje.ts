import mongoose from "mongoose";

const Schema=mongoose.Schema;

let OsvojeneMedalje=new Schema(
    {
        rang:{
            type:Number
        },
        zemlja:{
            type:String
        },
        zlato:{
            type:Number
         },
        srebro:{
             type:Number
         },
        bronza:{
            type:Number
        }
    }
);

export default mongoose.model("OsvojeneMedalje", OsvojeneMedalje,"osvojeneMedalje");

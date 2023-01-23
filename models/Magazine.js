import mongoose from "mongoose";



const magazineSchema =mongoose.Schema({

    title:{
    type:String,
    required:true
    },
    
    isbn :{
        type:String,
        required:true
    },

    publishedAt: {
        type:String,
        required:true
    },
   
    authors :[{
       
        type:mongoose.Types.ObjectId,
        ref:"Author",
        required:true

    }]
})


export default mongoose.model("magazine",magazineSchema)
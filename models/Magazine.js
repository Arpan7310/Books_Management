import mongoose from "mongoose";



const magazineSchema =mongoose.createSchema({

    title:{
    type:String,
    required:true
    },
    
    isbn :{
        type:Number,
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
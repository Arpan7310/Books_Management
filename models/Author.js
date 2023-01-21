import mongoose from "mongoose";


const authorSchema= mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    firstName :{
        type:String,
        required:true
    },
    lastName :{
        type:String,
        required:true
    }
})


export default mongoose.model('Author',authorSchema);
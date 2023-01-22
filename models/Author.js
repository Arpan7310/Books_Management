import mongoose from "mongoose";


const authorSchema= mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    firstname :{
        type:String,
        required:true
    },
    lastname :{
        type:String,
        required:true
    },
    books :[{
        type:mongoose.Types.ObjectId,
        ref:"books",
        required:true
    }],

    magazines:[{
        type:mongoose.Types.ObjectId,
        ref:"magazine",
        required:true
    }]


})


export default mongoose.model('Author',authorSchema);
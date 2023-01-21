import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    isbn :{
        type:Number,
        required:true,
    },
   
    description: {
    type:String,
    required:true
    },
    
    authors :[{
    type:mongoose.Types.ObjectId,
    ref:"Author",
    required:true
    }]
})

export default mongoose.model('books',bookSchema)
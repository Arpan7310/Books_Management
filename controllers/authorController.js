import csv from 'csvtojson'
import Author from '../models/Author.js';
import Book from '../models/Book.js';


export const  saveAuthor  =async (req,res,next) =>{

   csv({delimiter: 'auto'}).fromFile(req.file.path).then( async response=>{
  
   
   
    
    
     Author.insertMany(response,(err,data)=>{
        if(err){
            console.log(err)
            res.status(500).json({message:JSON.stringify(err)})
        }
        else {
            res.status(200).json({message:"Authors data saved successfully"})
        }
     })
     })
   
    
}


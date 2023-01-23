import csv from 'csvtojson'
import Author from '../models/Author.js';
import Book from '../models/Book.js';


export const  saveAuthor  =async (req,res,next) =>{

   csv({delimiter: 'auto'}).fromFile(req.file.path).then( async response=>{
  

     let i;

     for (i=0;i<response.length;i++){
      

         let foundAuthor= await Author.findOne({email:response[i]["email"]});
          
         if(!foundAuthor){
            
          let newAuthor=   new Author({
                firstname:response[i]["firstname"],
                lastname:response[i]["lastname"],
                email:response[i]["email"]
            })
             newAuthor.save();
         }
         else {
            console.log("author exists")
         }
        

     }
     res.status(200).json({message:"Authors data saved successfully"})


    

     })
   
    
}


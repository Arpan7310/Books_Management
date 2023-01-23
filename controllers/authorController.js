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


export const findBooksAndMagazinesByEmail =async(req,res,next) =>{

    let email=req.body.email,author;
   
    try {
     author= await Author.findOne({email:email}).populate("books magazines");
    }
    catch (err){
      return console.log(err);
    }

    if(!author){
        res.status(400).json({message:"No user found"});
        return;
    }
   
    res.status(200).json({message:author});
   

}


import csv from 'csvtojson';
import Author from '../models/Author.js';
import Book from '../models/Book.js'
import Magazine from '../models/Magazine.js';

export const saveBooks = async (req,res,next) =>{


    csv({delimiter:"auto"}).fromFile(req.file.path).then( async response=>{
         let i,j;

        for(i=0;i<response.length;i++){

            let foundBook= await Book.findOne({isbn:response[i]["isbn"]});

            if(!foundBook){


            let authors=response[i]["authors"];
            let authorArray=authors.split(',');
        
            let newArray=[];
            for (j=0;j<authorArray.length;j++){
              let x= await Author.findOne({email:authorArray[j]});
              newArray.push(x._id)
            }
           
            

            let newbook = new Book ({
                title:response[i].title,
                isbn:response[i].isbn,
                description:response[i].description,
                authors:newArray

            })

            

            try {
                newbook.save( async (err,room)=>{
                    let k;
                 for (k=0;k<room["authors"].length;k++){
                     await  Author.findByIdAndUpdate(room["authors"][k],{
                     $push:{"books":room["_id"]}}
                    )
                 }

               
                })
            }

            catch (err) {
                console.log(err)
            }
        }
        else {
            console.log("Book already present");
        }

        }
        res.status(200).json({message:response})     
    })
}


export const findAllBooksAndMagazine =async (req,res,next) =>{

   let books,magazines,finalList;
     
    try{
         books=await Book.find({});
         magazines=await Magazine.find({});
         finalList=[{books},{magazines}]
    }
    catch (err){
        console.log(err);
    }

  

    return res.status(200).json({list:finalList})
}


export const findAllBooksAndMagazineSorted =async (req,res,next) =>{

    let books,magazines,finalList;
      
     try{
          books=await Book.find({});
          magazines=await Magazine.find({});
          finalList=[...books,...magazines]
          finalList.sort(function(a,b){
            if(a.title.toUpperCase()<b.title.toUpperCase()){
                return -1;
            }
            else if (a.title.toUpperCase()>b.title.toUpperCase()){
                return 1;
            }
            else 
            return 0;
          })
     }
     catch (err){
         console.log(err);
     }
 
   
 
     return res.status(200).json({list:finalList})
 }


 export const findByIsbn = async (req,res,next) =>{
    try {
     let isbn=req.query.isbn;
    
 
     let book=await Book.findOne({isbn:isbn});
     if(!book){
        return res.status(400).json({message:"Not found"})
     }
     else {
     res.status(200).json({book:book})
     }
    }
    catch (err){
     return console.log(err)
    }


 }















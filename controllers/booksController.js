import csv from 'csvtojson';
import Author from '../models/Author.js';
import Book from '../models/Book.js'

export const saveBooks = async (req,res,next) =>{


    csv({delimiter:"auto"}).fromFile(req.file.path).then( async response=>{
         let i,j;

        for(i=0;i<response.length;i++){
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
        res.status(200).json({message:response})     
    })
}












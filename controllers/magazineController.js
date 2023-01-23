import csv from 'csvtojson';
import Author from '../models/Author.js';
import Magazine from '../models/Magazine.js';

export const saveMagazines = async (req,res,next) =>{


    csv({delimiter:"auto"}).fromFile(req.file.path).then( async response=>{
         let i,j;

        for(i=0;i<response.length;i++){

           let magazineFound= await Magazine.findOne({isbn:response[i]["isbn"]})
        
         if(!magazineFound){

            let authors=response[i]["authors"];
            let authorArray=authors.split(',');
        
            let newArray=[];
            for (j=0;j<authorArray.length;j++){
              let x= await Author.findOne({email:authorArray[j]});
              newArray.push(x._id)
            }
            console.log(newArray)

            let newMagazine = new Magazine ({
                title:response[i].title,
                isbn:response[i].isbn,
                publishedAt:response[i].publishedAt,
                authors:newArray

            })

                try {
                    newMagazine.save( async (err,room)=>{
                        let k;
                     for (k=0;k<room["authors"].length;k++){
                         await  Author.findByIdAndUpdate(room["authors"][k],{
                         $push:{"magazines":room["_id"]}}
                        )
                     }
    
                   
                    })
                }
                catch(err){
                    console.log(err);
                }
            

            }
            else {
                console.log("magazine present in db" )
            }


        }
        res.status(200).json({message:response})     
    })
}










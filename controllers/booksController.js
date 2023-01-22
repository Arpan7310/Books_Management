import csv from 'csvtojson';
import Book from '../models/Book';


export const saveBooks = async (req,res,next) =>{


    csv({delimiter:"auto"}).fromFile(req.file.path).then(response=>{
        console.log(response)
        res.status(200).message({message:"okay"});
    })
}
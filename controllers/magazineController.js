import csv from 'csvtojson';
import Author from '../models/Author.js';
import Magazine from '../models/Magazine.js';
import fs from 'fs';
import { dirpath } from '../app.js';
export const saveMagazines = async (req, res, next) => {


    csv({ delimiter: "auto" }).fromFile(req.file.path).then(async response => {
        let i, j;

        fs.unlink(`${dirpath.concat("/"+req.file.originalname)}`,function(err){
            console.log(err)
          })


        if (req.file.mimetype !== 'text/csv') {
            return res.status(400).send({ message: "Please upload a valid csv file" });
        }

        for (i = 0; i < response.length; i++) {

            if (!response[i]["title"] || !response[i]["isbn"] || !response[i]["publishedAt"] || !response[i]["authors"]) {
                return res.status(500).json({ message: "Fields missing in csv ,please check your csv file" })
            }

            let magazineFound = await Magazine.findOne({ isbn: response[i]["isbn"] })

            if (!magazineFound) {

                let authors = response[i]["authors"];
                let authorArray = authors.split(',');

                let newArray = [];
                for (j = 0; j < authorArray.length; j++) {
                    let x = await Author.findOne({ email: authorArray[j] });
                    if(!x){
                        return res.status(500).json({message:"Author not found in db please check valid email"})
                    }
                    newArray.push(x._id)
                }
                console.log(newArray)

                let newMagazine = new Magazine({
                    title: response[i].title,
                    isbn: response[i].isbn,
                    publishedAt: response[i].publishedAt,
                    authors: newArray

                })

                try {
                    newMagazine.save(async (err, room) => {
     

                        if(err){
                           return  res.status(500).json({message:err})
                        }
                        let k;
                        for (k = 0; k < room["authors"].length; k++) {
                            await Author.findByIdAndUpdate(room["authors"][k], {
                                $push: { "magazines": room["_id"] }
                            }
                            )
                        }


                    })
                }
                catch (err) {
                    console.log(err);
                }


            }
            else {
                console.log("magazine present in db")
            }


        }
        res.status(200).json({ message: response })
    })
}


export const findByMagazineIsbn = async (req, res, next) => {
    try {
        let isbn = req.query.isbn;


        let magazine = await Magazine.findOne({ isbn: isbn });
        if (!magazine) {
            return res.status(400).json({ message: "Not found" })
        }
        else {
            res.status(200).json({ magazine })
        }
    }
    catch (err) {
        return console.log(err)
    }


}










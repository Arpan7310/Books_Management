import csv from 'csvtojson'
import Author from '../models/Author.js';
import Book from '../models/Book.js';


export const saveAuthor = async (req, res, next) => {

    if (req.file.mimetype !== 'text/csv') {
        return res.status(400).send({ message: "Please upload a valid csv file" });
    }




    csv({ delimiter: 'auto' }).fromFile(req.file.path).then(async response => {


        let i;

        for (i = 0; i < response.length; i++) {

            if (!response[i]["email"] || !response[i]["firstname"] || !response[i]["lastname"]) {
                return res.status(500).json({ message: "Fields missing in csv ,please check your csv file" })
            }
            let foundAuthor;



            foundAuthor = await Author.findOne({ email: response[i]["email"] });




            if (!foundAuthor) {

                let newAuthor = new Author({
                    firstname: response[i]["firstname"],
                    lastname: response[i]["lastname"],
                    email: response[i]["email"]
                })

                newAuthor.save((err,room)=>{
                         if(err){
                           return  res.status(500).json({message:err})
                         }
                });

            }
            else {
                console.log("author exists")
            }


        }
        res.status(200).json({ message: "Authors data saved successfully" })




    })


}


export const findBooksAndMagazinesByEmail = async (req, res, next) => {

    let email = req.body.email, author;

    try {
        author = await Author.findOne({ email: email }).populate("books magazines");
    }
    catch (err) {
        return console.log(err);
    }

    if (!author) {
        res.status(400).json({ message: "No user found" });
        return;
    }

    res.status(200).json({ message: author });


}


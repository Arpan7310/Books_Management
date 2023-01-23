import express from 'express';
import { findAllBooksAndMagazine, findAllBooksAndMagazineSorted, findByIsbn, saveBooks } from '../controllers/booksController.js';
import multer from 'multer';


var storage=multer.diskStorage({

    destination:(req,file,cb) =>{
      cb(null,'./public/uploads')
    },
     
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
      },

  }
);

var uploads=multer({storage:storage});
const bookRouter=express.Router();
bookRouter.post('/save',uploads.single("csvFile"),saveBooks);
bookRouter.get("/findAll",findAllBooksAndMagazine);
bookRouter.get("/findAllSorted",findAllBooksAndMagazineSorted)
bookRouter.get("/findByIsbn",findByIsbn)
export default bookRouter;


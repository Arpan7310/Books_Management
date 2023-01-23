import express from 'express';
import { saveBooks } from '../controllers/booksController.js';
import multer from 'multer';
import { saveMagazines } from '../controllers/magazineController.js';


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
const magazineRouter=express.Router();
magazineRouter.post('/save',uploads.single("csvFile"),saveMagazines);

export default magazineRouter;


import express from 'express'
 
import {saveAuthor}  from '../controllers/authorController.js';
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
const authorRouter =express.Router();
authorRouter.post("/save",uploads.single('csvFile'), saveAuthor);

export default authorRouter;


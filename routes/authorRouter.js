import express from 'express'
 
import {saveAuthor}  from '../controllers/authorController.js';


const authorRouter =express.Router();
authorRouter.post("/save",saveAuthor);

export default authorRouter;


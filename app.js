import express from 'express';
import mongoose from 'mongoose';
import authorRouter from './routes/authorRouter.js';
import bookRouter from './routes/bookRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import magazineRouter from './routes/magazineRouter.js';

const app=express();
const __filename=fileURLToPath(import.meta.url);// returns the whole path till file which is inside directory
console.log(__filename);
const __dirname=path.dirname(__filename); //  returns the whole path till directory
console.log(__dirname);
export const dirpath=path.resolve(__dirname,"public/uploads")
console.log("my final answer" +path.resolve(__dirname,"public/uploads")); // creates an absolute path with directory name and CUSTOM folder name 
//app.use(express.static(path.resolve(__dirname,'publicko')))
app.use(express.json());


app.use("/api/author",authorRouter);
app.use("/api/books",bookRouter)
app.use("/api/magazines",magazineRouter)


mongoose.connect('mongodb+srv://Arpan:password1234@cluster0.5mztn43.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then((res)=>{
app.listen(3000);


}).catch((err)=>{
console.log(err)
})




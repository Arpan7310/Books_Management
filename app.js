import express from 'express';
import mongoose from 'mongoose';
import authorRouter from './routes/authorRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app=express();
const __filename=fileURLToPath(import.meta.url);// returns the whole path till file which is inside directory
console.log(__filename);
const __dirname=path.dirname(__filename); //  returns the whole path till directory
console.log(__dirname);
console.log("my final answer" +path.resolve(__dirname,"publicko")); // creates an absolute path with directory name and CUSTOM folder name 
//app.use(express.static(path.resolve(__dirname,'publicko')))
app.use(express.json());


app.use("/api/user",authorRouter);

mongoose.connect('mongodb://127.0.0.1:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then((res)=>{
app.listen(3000);

}).catch((err)=>{
console.log(err)
})




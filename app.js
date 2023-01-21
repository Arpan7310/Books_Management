import express from 'express';
import mongoose from 'mongoose';
import authorRouter from './routes/authorRouter.js';

const app=express();
app.use(express.json());
app.use("/api/user",authorRouter);

mongoose.connect('mongodb://127.0.0.1:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then((res)=>{
app.listen(3000);

}).catch((err)=>{
console.log(err)
})




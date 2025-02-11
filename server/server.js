import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';

dotenv.config();
const PORT=process.env.PORT||3000;
// console.log(process.env.PORT);
const app=express();

app.use(express.json({limit:"10mb"}));


app.listen(PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
    connectDB();
});
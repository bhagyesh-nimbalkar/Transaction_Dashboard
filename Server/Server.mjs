import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { TransactionSchema } from './Schema.mjs';

const app = express();
dotenv.config();
app.use(cors());
const PORT = 3000;


await mongoose.connect(process.env.DATABASE_URL)
.then((req)=>{console.log("Database Connected...")},err=>{console.log("Database Connection Failed")});

const Transaction = mongoose.model('Transaction',TransactionSchema);
app.get('/',async (req,res)=>{
     console.log("inside / body");
     try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        if(response.ok){
            if(await Transaction.countDocuments()>0){
                console.log("Data Already Present.");
                return res.end();
            }
            const data = await response.json();
            const convertData = [...data];
            convertData.forEach((ele,index)=>{
                const split = ele.dateOfSale.toString().split('-');
                convertData[index].month=Number(split[1]);
            });
            await Transaction.insertMany(convertData);
            return res.status(200).end();
        }
     } catch (error) {
        console.log(error);
     }
     return res.status(500).json({"error":"Error Occurred.."}).end();
})
app.get('/get_all',async(req,res)=>{
    const month = req.query.month;
    const search = req.query.search || '';
    const page = req.query.page;
    let price;
    if (!isNaN(Number(search))) {
        price = Number(search);
    }
    const conditions = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
    ];
    if (price !== undefined) {
        conditions.push({ price: price });
    }
    try {
        const result = await Transaction.find({
            month: month,
            $or: conditions
        }).skip(page*10).limit(10);
        return res.json(result); 
    } catch (error) {
        console.error('Error executing query:', error); 
        return res.status(500).send('Internal Server Error');
    }    
})
app.get('/get_stat',async(req,res)=>{
    const { month } = req.query;
    try {
        const result = await Transaction.find({ month }).lean();
        const len = result.length;
        const sold = result.filter(ele => ele.sold === true).length;
        const notsold = len - sold;
        
        return res.json({ length: len, Sold: sold, NotSold: notsold });
    } catch (error) {
        console.error('Error executing query:', error); 
        return res.status(500).send('Internal Server Error');
    }    
});
app.get('/get_bar',async(req,res)=>{
    console.log("Inside /get-bar");
    const { month } = req.query;

    try {
        const result = await Transaction.find({ month }).lean();
        const finalResult = []
        for(let i=0;i<10;i++){
           let cnt = 0;
         if(i===9)
         {
           cnt = result.filter((ele)=>ele.price>901).length;
         }else{
            let start = (i*100)+1;
            let end = ((i+1)*100);
            cnt = result.filter((ele)=>ele.price>=start && ele.price<=end).length;
         }
         finalResult.push(cnt);
        }
        console.log("FinalResult", finalResult);
        return res.json(finalResult);
    } catch (error) {
        console.error('Error executing query:', error);
        return res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT,()=>{
    console.log("Server running...");
})
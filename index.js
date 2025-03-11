const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY)
 
const app =express();
app.use(express.json());
app.use(cors({origin:true}));
app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'success!!',
    })
});
app.post('/payment/create',async (req,res)=>{
    const total = req.query.total
    if(total > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:'usd',
        }); //Creates a payment request.
        res.status(201).json({
            clientSecret:paymentIntent.client_secret,
        }); // Purpose: Frontend uses clientSecret to complete the payment.

    }
    else{
        res.status(403).json({
            message: 'total must be greater than 0'
        })
    }
})
app.listen(5000,(err)=>{
    if(err){
        console.log('problem on running the the app');
    }
    else{
        console.log('amazon server running on port 5000');
    }
})

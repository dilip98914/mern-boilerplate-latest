const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const user = require('./models/user')
const product = require('./models/product')
const YOUR_DOMAIN = 'http://localhost:3000';

app.use(cors())
app.use(express.json())
const stripe = require('stripe')('sk_test_qaofJBbCCvoSaD8UdOhrumh5');

mongoose.connect(encodeURI('mongodb+srv://admin:Dilip%40123@cluster0.n6ybqtu.mongodb.net/flipkart2'))
app.post('/api/checkout-session', async (req, res) => {
    console.log('aaaaa',req.body) 


    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1PNoDBHKYXZ48D7A3xvOuF0E',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.redirect(303, session.url);
});
app.post('/api/register',async(req,res)=>{
    try{
        const hash=await bcrypt.hash(req.body.password,10)
        await user.create({
            email:req.body.email,
            name:req.body.name,
            password: hash
        })
        res.json({status:'ok'})
    }catch(err){
        res.json({
            status:'error',
            error:'duplicate email!'
        })
    }
})


app.post('/api/login', async (req, res) => {
    try {
        console.log(req.body)
        const userObj=await user.findOne({
            email: req.body.email
        })
        if (!userObj) return res.json({status:'error',error:'invalid login!'})

        const isvalidPassword=await bcrypt.compare(req.body.password,userObj.password)
        if(isvalidPassword){
            const token=jwt.sign({
                name: userObj.name,
                email: userObj.email
            },'secrettoken')
            res.json({ status: 'ok',user:token })
        }else{
            res.json({ status: 'error',user:false })
        }
    } catch (err) {
        console.error(err)
        res.json({
            status: 'error',
            error: 'duplicate email!'
        })
    }
})

app.post('/api/product', async (req, res) => {
    try {

        // const obj=await product.create({
        //     title:req.body.title,
        //     slug:title.toLowerCase().replace(' ','-'),
        //     description: req.body.description,
        //     quantity:req.body.quantity,
        //     tags:req.body.tags
        // })
        const obj = await product.create({
            name: 'I Phone',
            slug: 'i-phone',
            description: 'Costly smartphone from apple Inc',
            quantity: 400,
            tags: ['smartphones','gadget','apple']
        })
        res.json({
            status: 'ok',
            data: obj.lean()
        })

    } catch (err) {
        console.error(err)
        res.json({
            status: 'error',
            error: 'product not created!'
        })
    }
})


app.get('/api/product', async (req, res) => {
    try {
        const products = await product.find({}).lean()
        res.json({
            status: 'ok',
            data: products
        })

    } catch (err) {
        console.error(err)
        res.json({
            status: 'error',
            error: 'something went wrong!'
        })
    }
})


app.listen(1337,()=>{
    console.log('Server is Listening at 1337')
})



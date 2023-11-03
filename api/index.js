const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const Post = require('./models/post');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() =>{
    console.log('is connected to the database mongo');
})
.catch(e => console.log(`this is the error${e}`))



// endpoint to register user in the backend



app.post("/register", async(req,res) => {

    try{
        const{name,email,profileImage,password} = req.body

        //check if the email exist

        const existingUser = await User.findOne({email});


        if(existUser){
            console.log('email already taken')
            res.status(400).json({message:"email already registered"})
        }


        // create a new user

        const newUser = new User({
            name,
            email,
            password,
            profileImage
        });

        // generate a verification token

        newUser.verificationToken = crypto.randomBytes(20).toString("hex");



        // save the user to the database

        await newUser.save()

        // this the verfication email to the user


        sendVerificationEmail(newUser.email,newUser.verificationToken)

        res.status(202).json({message:"Registration successful, check your email to verify your account"})

    }

    catch(err){
        console.log('this erroring resigter user','err')
        res.status(500).json({message:"Registration failure"})
    }
})


// to send the email

const sendVerificationEmail = async(email,verificationToken) =>{

    // creating the nodemailer

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"windbreeze12@gmail.com",
            pass:process.env.PASSCODE
        }
    })





}


app.listen(port,()=>{
    console.log(`this is server ${port}`)
})





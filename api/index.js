const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const Post = require('./models/post');
const jwt = require('jsonwebtoken');
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

    console.log(req.body,'this is register body')

    try{
        const{name,email,profileImage,password} = req.body

        //check if the email exist

        const existingUser = await User.findOne({email});


        if(existingUser){
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

    catch(error){
        console.log('this erroring resigter user','err', `${error}`)
        res.status(500).json({message:"Registration failure"})
    }
})





// generate the secretkey


const generateSecretKey = () => {

    const secretKey = crypto.randomBytes(32).toString('hex')
    return secretKey;

}

const secretKey = generateSecretKey()






// login endpoint to user
app.post('/login',async(req,res) => {

    try{

        const {email,password}  = req.body;


        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message:"Invalid email or password"})
        } 
        // check if password is correct
        if(user.password !== password){
            return res.status(401).json({message:"Invalid password or email"})
        }

          const token = jwt.sign({userId:user._id},secretKey);


          res.status(200).json({token,message:'successfully signed it'})

    }

    catch(err){

        res.status(500).json({message:"Login failure"})

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
    });

    //finishing complete your email

    const mailOptions ={
        from:"yourfriends@gmail",
        to:email,
        subject:"Email verfication",
        text:`pleace click the following link to verfiy your email : http:/localhost:8000/verify/${verificationToken}`
    }


    // send the email


    try{

        await transporter.sendMail(mailOptions);
        console.log("Verifcation email sent successfully")

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'error sending the email'})
    }
}

//  more api endpoint

// api to indentify email

app.get('/verify/:token',async(req,res)=> {
    
    try{
        const token = req.params.token;

        const user = await User.findOne({verificationToken:token});

        if(!user){
            return res.status(404).json({message:"Invalid verification token"})
        }


        // mark the user as verified
        user.verified = true;
        user.verificationToken = undefined


        await user.save()


        res.status(200).json({message:'Emailed verfication succesful' })





    }
    catch(err){

        res.status(500).json({message:"email vertification fialed"})
    }


})



//  getting user's profile


app.get('/profile/:userId', async(req,res) => {


    try{
            const userId = req.params.userId;

            const user = await User.findById(userId)


            if(!user){
                return res.status(404).json({message:'user not found'})
            }
            res.status(200).json({user})
    }

    catch(err){
        res.status(500).json({message:'Error retrieving user profile'})
    }




})


// gets  alls users and show them accept the user


app.get("/users/:userId", async(req,res) => {

    try{
        const loggedInUserId = req.params.userId;


        // fetch the logged in usres connections

        const loggedInuser = await User.findById(loggedInUserId).populate("connections","_id");

        if(!loggedInuser){
             return res.status(400).json({message:'User not found'})
        } 

        //  get the ids of the connected user

        const connectedUsersIds = loggedInuser.connections.map((connection) => connection._id);


        //  find the users who are not connected to the loggin in id
 

         const users = await User.find({
            _id:{$ne:loggedInUserId, $nin:connectedUsersIds}
         })


         res.status(200).json(users)


    }


    catch(err){
        console.log('error retireving errors', error);
        res.status(500).json({message:'Error retrieving users'})
    }
})



app.listen(port,()=>{
    console.log(`this is server ${port}`)
})





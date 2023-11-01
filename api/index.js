const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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


app.listen(port,()=>{
    console.log(`this is server ${port}`)
})





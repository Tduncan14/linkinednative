const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');




const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://petuneotreek:pokemon1@cluster0.zn7fkrv.mongodb.net/',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() =>{
    console.log('is connected to the database mongo');
})
.catch(e => console.log(`this is the error${e}`))


app.listen(port,()=>{
    console.log(`this is server ${port}`)
})




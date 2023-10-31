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






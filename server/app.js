const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config({path: './.env'});
require('./db/conn');
// const User = require('./model/UserSchema.js');'

app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));

const PORT = process.env.PORT;


app.listen(PORT,() => {
    console.log(`Server is running at ${PORT} port`);
});

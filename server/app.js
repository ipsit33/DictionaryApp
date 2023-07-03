const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT;

dotenv.config({path: './.env'});
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
// const User = require('./model/UserSchema.js');'

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(require('./router/auth'));


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

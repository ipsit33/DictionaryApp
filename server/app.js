const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');
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



app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

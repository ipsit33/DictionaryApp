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
// Enable CORS for your frontend domain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Proxy endpoint to forward requests to the Cyclic backend
app.use('/api', (req, res) => {
  const targetUrl = 'https://vast-pink-drill-coat.cyclic.app'; // Replace with your Cyclic backend URL
  const targetPath = req.url;
  const targetHeaders = {
    ...req.headers,
    host: new URL(targetUrl).host,
    origin: undefined,
  };

  axios({
    method: req.method,
    url: targetUrl + targetPath,
    data: req.body,
    headers: targetHeaders,
    withCredentials: true,
  })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
    });
});


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

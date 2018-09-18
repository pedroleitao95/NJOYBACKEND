const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


//Models



const app = express();


//Connect to MongoDB cluster

mongoose.connect("mongodb+srv://pedro:" + process.env.MONGO_ATLAS_PW + "@cluster0-l0r5n.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

//CORS ALLOW (Cross Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;

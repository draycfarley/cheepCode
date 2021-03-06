const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config= require("config");
const users = require("./routes/users");
const questions = require("./routes/questions");

const app = express();

//Body Parser Middleware

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//DB Config

const db = config.get("mongoURI");

mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('Mongo DB connected'));

app.use('/api/users', users);
app.use('/api/questions', questions);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

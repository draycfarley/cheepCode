const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const placeholder = require("./routes/api/placeholder");

const app = express();

//Body Parser Middleware

app.use(bodyParser.json());

//DB Config

const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
.then(()=> console.log('Mongo DB connected'));

app.use('/api/placeholder', placeholder);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

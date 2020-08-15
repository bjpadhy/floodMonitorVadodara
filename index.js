//Import and initialize express, mongoose client
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const mongoose = require('mongoose');
require('dotenv/config');


//Port number and config for server
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

//Middleware - A function that executes when a route is hit
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet())

//Database Connection
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(error) {
        console.error(`Connection Error: ${error}`);
    }
    else {
        console.log("Connection to DB successful")
    }
});

//Routes
//Home
app.get('/', (request, response) => {
    response.send("Welcome to flood monitor project REST API");
});

//Levels
const levelsRoute = require('./routes/levels');
app.use('/api/levels', levelsRoute);
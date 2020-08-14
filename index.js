//Import and initialize express, mongoose client
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

//Port number and config for server
app.listen(3000);

//Middleware - A function that executes when a route is hit
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(helmet())

//Database Connection
const client = new MongoClient(process.env.DB_CONNECT, { useNewUrlParser: true });

//Routes
app.get('/', (request, response) => {
    response.send("Welcome to flood monitor project REST API");
});

app.get('/api/vishwamitrilevels', (request, response) => {
    client.connect(async err => {
        const vishwamitri = await client.db("flood_monitor_project").collection("vishwamitri_levels");
        const res = await vishwamitri.find().toArray();
        response.status(200).json(res);
        client.close();
      });
});

app.get('/api/ajwalevels', (request, response) => {
    client.connect(async err => {
        const ajwa = await client.db("flood_monitor_project").collection("ajwa_levels");
        const res = await ajwa.find().toArray();
        response.status(200).json(res);
        client.close();
      });
});
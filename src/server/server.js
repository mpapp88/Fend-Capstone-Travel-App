// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Setup empty JS object to act as endpoint for the /client route
//const userData = [];

//Importing modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express()

const dotenv = require('dotenv');
dotenv.config();

// To remove regeneratorRuntime error while testing
require('babel-polyfill');

// Cors for cross origin allowance
app.use(cors());

//Configuring the middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/all', function (req, res) {
    res.sendFile('dist/index.html')
});

//GeoNames API
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const geoKEY = process.env.GEO_KEY;

//Weatherbit API
const weatherURL = 'http://api.weatherbit.io/v2.0/forecast/daily?'
const weatherKEY = process.env.WEATHER_KEY;

//Pixabay API
const pixaURL = 'https://pixabay.com/api/'
const pixaKEY = process.env.PIXABAY_KEY;



//POST Route for Geoname API
app.post("/place", async function(req, res) {
    let place = req.body.city;
    let geoNamesApi = `${geoURL}${place}&maxRows=1&username=${geoKEY}`;
    let response = await fetch(geoNamesApi);
    try {
        const geoNamesData = await response.json();
        console.log(geoNamesData)
        res.send(geoNamesData);
        return geoNamesData;
    } catch (error) {
        console.log(error)
    }
});

//POST route for Weatherbit API//
app.post("/weather", async function (req, res) {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let weatherApi= `${weatherURL}&lat=${latitude}&lon=${longitude}&key=${weatherKEY}`;
    let response = await fetch(weatherApi);
    try {
        const weatherData = await response.json();
        console.log(weatherData)
        res.send(weatherData);
        return weatherData;
    } catch (error) {
        console.log(error);
    }
});

//POST route for pixabay API//
app.post("/pic", async function (req, res) {
    let place = req.body.city;
    let pixaApi = `${pixaURL}?key=${pixaKEY}&q=${place}&image_type=photo`;
    let response = await fetch(pixaApi);
    try {
        const pixaData = await response.json();
        console.log(pixaData);
        res.send(pixaData);
    } catch (error) {
        console.log(error);
    }
});

module.export = app


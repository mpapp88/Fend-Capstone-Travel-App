// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost: port ${port}`);
};

//GET route
app.get('/allData', (req, res) => {
    res.send(projectData);
    console.log('Data sent');
});

//POST route
const data = [];
app.post('/addData', (req, res) => {
    res.send('POST received');
    projectData.date = req.body.date;
    projectData.temperature = req.body.temperature;
    projectData.feeling = req.body.feeling;
    res.send(projectData);
    console.log(projectData);
    res.send(true);
});
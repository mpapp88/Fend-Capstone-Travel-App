/* Global Variables */
//API Key for OpenWeather
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',gb&units=metric&APPID=a9af7139d8fec18c6941cecbae711816' //UK version

// Create a new date instance dynamically with JS - UK Date format
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

//Add event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

//Function used by event listener
function performAction(e) {
    e.preventDefault();
    const newZip = document.getElementById('zip').value; //UK version
    const userInput = document.getElementById('feelings').value;
    getWeatherData(baseURL, newZip, apiKey)
    .then(function(weatherData) {
        //Add data to post request
        postData('/addData', {
            date: newDate,
            temperature: weatherData.main.temp,
            feeling: userInput})
    })
    .then(function(newData) {
        //Update UI
        updateUI();
    })
};

//Get the weather data
const getWeatherData = async (baseURL, newZip, apiKey) => {
    const response = await fetch (baseURL + newZip + apiKey);
    console.log(response);
    try {
        const weatherData = await response.json();
        return weatherData;
    }
    catch(error) {
        console.log("error", error);
    }
}

//Get project data
const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        return allData
    }
    catch(error) {
        console.log("error", error)
    }
};


//Post project data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

//Update User Interface
const updateUI = async () => {
    const request = await fetch('/allData');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Today the date is: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Today\'s temperature is: ' + allData.temperature + ' Celsius.';
        document.getElementById('content').innerHTML = 'I feel ' + allData.feeling;
    }
    catch(error) {
        console.log("error", error);
    }
};
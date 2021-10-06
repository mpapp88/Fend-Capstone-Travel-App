const { json } = require("body-parser");
import getCountdown from "..src/client/js/countdown"

let tripTo = {};
let weather = {};
let pic = {};

//Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', handleSubmit);

 export function handleSubmit(event) {
    event.preventDefault();

    let place = document.getElementById('place').value;
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;

    if (place == ""){
        alert('Please enter a valid destination.');
    }
    else if (start == ""){
        alert('Please enter your departure\'s date');
    }
    else if (end == ""){
        alert('Please enter your return\'s date')
    }
    postGeonamesData('http://localhost:8081/place',{city: place})
    .then(function(tripTo){
        console.log(tripTo);
        document.getElementById('tripto').innerHTML = ` City:${tripTo.city}, Conutry:${tripTo.country},
        Conutry Code:${tripTo.code}. `
    })
  

    postWeatherbitData("http://localhost:8801/weather", tripTo)
        .then (function(weather){
        
            document.getElementById('weather').innerHTML =`The weather 
            is <strong>${weather.description}</strong>, average emperature is <strong>${weather.averageTemp}</strong>.
            Hightest:<strong>${weather.lowestTemp}</strong>,
            Lowest:<strong>${weather.highestTemp}</strong>.`
        })

    postPixabayData('http://localhost:8801/pic',{  city:tripTo.city })
        .then(function (){
        
         let img = pic.hits[0].webformatURL;
         document.getElementById('pic').src=`${img}`;
    });
    getCountdown(departure);
};

//POST APIs

const postGeonamesData = async (url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    try {
        const geoData = await response.json();
        tripTo = {
            code: geoData.geonames[0].countrycode,
            city: geoData.geonames[0].name,
            county: geoData.geonames[0].countryName,
            latitude: geoData.geonames[0].lat,
            longitude: geoData.geonames[0].lng
        }
        return tripTo;
        } catch (error) {
            console.log('error', error)
        }
};

const postWeatherbitData = async (url = "", data = {}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    try {
        const weatherData = await response.json();
        weather = {
            description : weatherData.data[0].weather.description,
            averageTemp :weatherData.data[0].temp,
            lowestTemp : weatherData.data[0].low_temp,
            highestTemp : weatherData.data[0].max_temp
        }
        console.log(weather);

       return weather;
    } catch (error) {
        console.log('error', error)
    }
};

const postPixabayData = async (url = "", data = {}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    try {
        pic = await response.json();
        return pic;
    } catch (error) {
        console.log('error', error)
    }
}




/*// Create a new date instance dynamically with JS - UK Date format
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
};*/

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
}
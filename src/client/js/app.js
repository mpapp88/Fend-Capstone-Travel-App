//const { json } = require("body-parser");
import {getCountdown} from "./countdown"

let tripTo = {};
let weather = {};
let pic = {};

//Event listener to add function to existing HTML DOM element
//document.getElementById("submit").addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let placeInput = document.getElementById('place').value;
    let start = document.getElementById('departure').value;
    let end = document.getElementById('return').value;

    if (place == ""){
        alert('Please enter a valid destination.');
    }
    else if (start == ""){
        alert('Please enter your departure\'s date');
    }
    else if (end == ""){
        alert('Please enter your return\'s date')
    }

    postGeonamesData('http://localhost:8081/place',{city: placeInput})
    .then(function(tripTo){
        console.log(tripTo);
        document.getElementById('tripTo').innerHTML = ` You are going to <strong>${tripTo.city}</strong>, ${tripTo.country}. `
    

    postWeatherbitData("http://localhost:8081/weather", tripTo)
        .then (function(weather){
        
            document.getElementById('weather').innerHTML =`The expected weather for then 
            is <strong>${weather.description}</strong>, average temperature is <strong>${weather.averageTemp}</strong>C.
            Lowest:<strong>${weather.lowestTemp}</strong>C.,
            Highest:<strong>${weather.highestTemp}</strong>C.`
        });

    postPixabayData('http://localhost:8081/pic',{  city:tripTo.city })
        .then(function (){
        
         let img = pic.hits[0].webformatURL;
         document.getElementById('pic').src=`${img}`;
        });
    });
    getCountdown(start, end);
};

export {handleSubmit};

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
            country: geoData.geonames[0].countryName,
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

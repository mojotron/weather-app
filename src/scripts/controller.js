import '../styles/main.css';

// import { API_URL } from './config';
import { WEATHER_API_KEY } from './apikey';

// const state = {
//   forecast: {},
//   lat: null,
//   lon: null,
// };

const getJSON = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getCurrentLocation = () =>
  // Promisify geolocation api
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const getCurrentLocationCoords = data => {
  const { latitude: lat, longitude: lon } = data.coords;
  return { lat, lon };
};

// get weather data with current geolocation
getCurrentLocation()
  .then(response => getCurrentLocationCoords(response))
  .then(coords => {
    getJSON(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${WEATHER_API_KEY}`
    );
  })
  .catch(error => console.log(error.message));

// get weather data with city/country name
// const city = 'rovinj';

// search by city, get up to 5 search results
// getJSON(
//   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
// );

import '../styles/main.css';

// import { API_URL } from './config';
import { WEATHER_API_KEY } from './apikey';

const state = {
  forecast: {},
  lat: null,
  lng: null,
};

const getJSON = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    state.forecast = {};
  } catch (error) {
    console.error(error);
  }
};

const temp = data => {
  console.log(data);
  const { latitude, longitude } = data.coords;
  state.lat = latitude;
  state.lng = longitude;
  console.log(state);
  getJSON(
    `http://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lng}&appid=${WEATHER_API_KEY}`
  );
};

const getCurrentLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(temp);
  }
};

getCurrentLocation();

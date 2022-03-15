import '../styles/main.css';

// import { API_URL } from './config';
import { WEATHER_API_KEY } from './apikey';

const state = {
  current: {},
  hourly: [],
  daily: [],
  lat: null,
  lon: null,
};

const getAJAX = async url => {
  try {
    const response = await fetch(url);
    // if (!response.ok) throw new Error('network problem');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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
    state.lat = coords.lat;
    state.lon = coords.lon;
    return getAJAX(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.lon}&units=metric&exclude=minutely&appid=${WEATHER_API_KEY}`
    );
  })
  .then(data => {
    state.current = {
      city: data.timezone.split('/').at(-1),
      date: new Date(),
      temperature: {
        current: data.current.temp,
        feelsLike: data.current.feels_like,
        minimum: data.daily[0].temp.min,
        maximum: data.daily[0].temp.max,
      },
      uvIndex: data.current.uvi,
      description: data.current.weather[0].description,
      humidity: data.current.humidity,
      pressure: data.current.pressure,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      wind: {
        deg: data.current.wind_deg,
        speed: data.current.wind_speed,
        gust: data.daily[0].wind_gust,
      },
    };

    state.hourly = data.hourly.slice(1, 25).map(obj => ({
      temp: obj.temp,
      rainProbability: obj.pop,
      description: obj.weather[0].description,
    }));

    state.daily = data.daily.slice(1).map(obj => ({
      rainProbability: obj.pop,
      temp: {
        minimum: obj.temp.min,
        maximum: obj.temp.max,
      },
      description: obj.weather[0].description,
    }));

    console.log(state);
  })
  .catch(error => console.log(error.message));

// get weather data with city/country name
// const city = 'rovinj';

// search by city, get up to 5 search results
// getJSON(
//   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
// );

import { WEATHER_API_KEY } from './apikey';

export const state = {
  lat: null,
  lon: null,
  current: {},
  hourly: [],
  daily: [],
  bonus: [],

  setIsDay() {
    const time = this.current.date.getTime();
    this.current.isDay = time >= this.bonus.sunrise && time < this.bonus.sunset;
  },
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

const createCurrentWeatherObject = data => ({
  city: data.timezone.split('/').at(-1),
  date: new Date(),
  description: {
    id: data.current.weather[0].id,
    text: data.current.weather[0].description,
  },
  temp: {
    current: data.current.temp,
    feelsLike: data.current.feels_like,
    minimum: data.daily[0].temp.min,
    maximum: data.daily[0].temp.max,
  },
});

const createHourlyWeatherObject = data =>
  data.hourly.slice(1, 25).map(obj => ({
    time: obj.dt * 1000,
    temp: obj.temp,
    rainProbability: obj.pop,
    descriptionId: obj.weather[0].id,
  }));

const createDailyWeatherObject = data =>
  data.daily.slice(1).map(obj => ({
    time: obj.dt * 1000,
    rainProbability: obj.pop,
    temp: {
      minimum: obj.temp.min,
      maximum: obj.temp.max,
    },
    descriptionId: obj.weather[0].id,
  }));

const createBonusWeatherObject = data => ({
  uvIndex: data.current.uvi,
  humidity: data.current.humidity,
  pressure: data.current.pressure,
  sunrise: data.current.sunrise * 1000, // offset
  sunset: data.current.sunset * 1000, // offset
  wind: {
    deg: data.current.wind_deg,
    speed: data.current.wind_speed,
    gust: data.daily[0].wind_gust,
  },
});

// get weather data with current geolocation
export const loadWeatherData = async () => {
  try {
    const location = await getCurrentLocation();
    const coords = await getCurrentLocationCoords(location);
    state.lat = coords.lat;
    state.lon = coords.lon;
    const data = await getAJAX(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.lon}&units=metric&exclude=minutely&lang=${navigator.language}&appid=${WEATHER_API_KEY}`
    );
    console.log(data);
    state.current = createCurrentWeatherObject(data);
    state.hourly = createHourlyWeatherObject(data);
    state.daily = createDailyWeatherObject(data);
    state.bonus = createBonusWeatherObject(data);

    state.setIsDay();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// get weather data with city/country name
// const city = 'rovinj';

// search by city, get up to 5 search results
// getJSON(
//   `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
// );

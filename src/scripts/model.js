import { WEATHER_API_KEY } from './apikey';
import { API_URL, API_URL_GEO, UNITS } from './config';

const { Temporal } = require('@js-temporal/polyfill');

export const state = {
  lat: null,
  lon: null,
  units: UNITS.metric,
  current: {},
  hourly: [],
  daily: [],
  bonus: [],
  alerts: [],
  searchResults: [], // used to store mache
  searchIndex: null,

  setIsDayCurrent() {
    const time = this.current.date;
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
    throw error;
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
// TEMP start
const getDate = (date, timezone) => {
  const dateObj = Temporal.Instant.fromEpochSeconds(date);
  const timezoneObj = Temporal.TimeZone.from(timezone);
  return timezoneObj.getPlainDateTimeFor(dateObj).toString();
};
// TEMP end
const createCurrentWeatherObject = data => ({
  date: getDate(data.current.dt, data.timezone),
  description: {
    id: data.current.weather[0].id,
    text: data.current.weather[0].description,
  },
  temp: {
    current: Math.round(data.current.temp),
    feelsLike: Math.round(data.current.feels_like),
    minimum: Math.round(data.daily[0].temp.min),
    maximum: Math.round(data.daily[0].temp.max),
  },
});

const createHourlyWeatherObject = data =>
  data.hourly.slice(1, 25).map(obj => ({
    time: getDate(obj.dt, data.timezone), // TODO
    temp: Math.round(obj.temp),
    rainProbability: Math.round(obj.pop * 100),
    descriptionId: obj.weather[0].id,
    isDay: obj.weather[0].icon.at(-1) === 'd',
  }));

const createDailyWeatherObject = data =>
  data.daily.slice(1).map(obj => ({
    time: getDate(obj.dt, data.timezone), // TODO
    rainProbability: Math.round(obj.pop * 100),
    temp: {
      minimum: Math.round(obj.temp.min),
      maximum: Math.round(obj.temp.max),
    },
    descriptionId: obj.weather[0].id,
  }));

const createBonusWeatherObject = data => ({
  uvIndex: data.current.uvi,
  humidity: data.current.humidity,
  pressure: data.current.pressure,
  sunrise: getDate(data.current.sunrise, data.timezone), // TODO offset
  sunset: getDate(data.current.sunset, data.timezone), // TODO offset
  wind: {
    deg: data.current.wind_deg,
    speed: data.current.wind_speed,
  },
});

const createAlertsWeatherObject = data =>
  data.alerts.map(ele => ({
    tag: ele.tags[0],
    description: ele.description.split('\n'),
  }));

// get weather data with current geolocation
export const loadWeatherData = async (getLocation = true) => {
  try {
    if (getLocation) {
      const location = await getCurrentLocation();
      const coords = getCurrentLocationCoords(location);
      state.lat = coords.lat;
      state.lon = coords.lon;
    }

    const data = await getAJAX(
      `${API_URL}onecall?lat=${state.lat}&lon=${state.lon}&units=${state.units.label}&exclude=minutely&lang=${navigator.language}&appid=${WEATHER_API_KEY}`
    );
    state.current = createCurrentWeatherObject(data);
    state.hourly = createHourlyWeatherObject(data);
    state.daily = createDailyWeatherObject(data);
    state.bonus = createBonusWeatherObject(data);
    if (data.alerts) state.alerts = createAlertsWeatherObject(data);
    state.setIsDayCurrent();
    // get city name with another call to diff endpoint
    const data2 = await getAJAX(
      `${API_URL}forecast?lat=${state.lat}&lon=${state.lon}&appid=${WEATHER_API_KEY}`
    );
    state.current.city = `${data2.city.name}, ${data2.city.country}`;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const loadCityNames = async city => {
  try {
    const data = await getAJAX(
      `${API_URL_GEO}direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
    );

    state.searchResults = data.map(obj => ({
      city: obj.name,
      country: obj.country,
      lat: obj.lat,
      lon: obj.lon,
      ...(obj.state && { state: obj.state }),
    }));
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const setLocalStorage = units => {
  localStorage.setItem('weather-app', JSON.stringify(units));
};

const getLocalStorage = () => {
  const units = JSON.parse(localStorage.getItem('weather-app')) ?? 'metric';
  state.units = UNITS[units];
};

const init = () => {
  getLocalStorage();
};

init();

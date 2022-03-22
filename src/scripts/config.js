export const API_URL =
  'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

export const units = {
  metric: {
    label: 'metric',
    temp: '°C',
    wind: 'm/s',
  },
  imperial: {
    label: 'imperial',
    temp: '°F',
    wind: 'mph',
  },
  standard: {
    label: 'metric',
    temp: '°C',
    wind: 'm/s',
  },
};
// search by city name with 5 match limit
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid={API key}

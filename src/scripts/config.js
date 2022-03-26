const urlBase = 'https://api.openweathermap.org/';
const urlData = 'data/2.5/';
const urlGeo = 'geo/1.0/';

export const API_URL = `${urlBase}${urlData}`;
export const API_URL_GEO = `${urlBase}${urlGeo}`;

export const UNITS = {
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
    label: 'standard',
    temp: 'K',
    wind: 'm/s',
  },
};

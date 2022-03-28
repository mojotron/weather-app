# Weather App

This project is part of [The Odin Project](https://www.theodinproject.com) curriculum. The goal of this project is to create a weather forecast site using asynchronous JavaScript and fetching data from web servers using APIs.

Test live app [here](https://mojotron-weather.netlify.app/), project deployed using Netlify platform.

## About application

The weather application uses users current location, and displays current weather information for that location. So user must allow browser to use their current location.

The displayed weather data are current data, hourly data for the next 24 hours and daily data for the next 7 days.
Bonuses that the data application displays are uv index (numeric and color), times of sunset and sunrise for current city, wind with speed and direction arrow, humidity and air pressure.
If there is a weather alert for the current location, the application displays informative popup window which user can remove.

Options button (cogwheel icon in top right corner) opens options modal. User can pick measurement units option for displaying temperatures values in Celsius, Fahrenheit's or Kelvins. Additionally user can search weather data for a different city.

## What have I learned

Difficulties when working with dates. Biggest problem I faced was different time zones and daylight saving times. To overcome this difficulties, after couple of failed attempt of implementing algorithm to calculate timezone offsets, I used new temporal API which will be a new addition to the JavaScript.

Using navigator API to get data and format date using Intl API for clients default language.

How to copy all images to dist dir so they can be loaded dynamically.

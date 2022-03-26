import View from './View';
import { formatTime, getImagePath } from '../helpers';

class HourlySectionView extends View {
  _parentElement = document.querySelector('.weather__hourly');

  _generateMarkup() {
    return this._data.hourly
      .map(hourData => this._generateHourlyMarkup(hourData))
      .join('\n');
  }

  _generateHourlyMarkup(hourData) {
    return `
      <div class="hourly">
        <p class="hourly__time">${formatTime(hourData.time)}</p>
        <img class="hourly__image" src="./images/${getImagePath(
          hourData.descriptionId,
          hourData.isDay
        )}" alt="temp" />
        <p class="hourly__temp">${hourData.temp}${this._data.units.temp}</p>
        <p class="hourly__pop">
          <img src="./images/droplet-svgrepo-com.svg"/>
        ${hourData.rainProbability}%</p>
      </div>
    `;
  }
}

export default new HourlySectionView();

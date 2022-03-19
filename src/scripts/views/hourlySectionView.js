import View from './View';
import { formatTime, getImagePath } from '../helpers';

class HourlySectionView extends View {
  _parentElement = document.querySelector('.weather__hourly');

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(hourData => this._generateHourlyMarkup(hourData))
      .join('\n');
  }

  _generateHourlyMarkup(hourData) {
    return `
      <div class="hourly">
        <p class="hourly__time">${formatTime(hourData.time)}</p>
        <img class="hourly__image" src="./images/${getImagePath(
          hourData.descriptionId
        )}" alt="temp" />
        <p class="hourly__temp">${hourData.temp.toFixed()}°</p>
        <p class="hourly__pop">💧${hourData.rainProbability}%</p>
      </div>
    `;
  }
}

export default new HourlySectionView();

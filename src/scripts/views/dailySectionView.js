import View from './View';
import { getDayName, getImagePath } from '../helpers';

class DailySectionView extends View {
  _parentElement = document.querySelector('.weather__daily');

  _generateMarkup() {
    return this._data
      .map(dataDaily => this._generateDailyMarkup(dataDaily))
      .join('\n');
  }

  _generateDailyMarkup(dataDaily) {
    return `
      <div class="daily">
        <p class="daily__weekday">${getDayName(dataDaily.time)}</p>
        <p class="daily__pop">💧${dataDaily.rainProbability}%</p>
        <div class="daily__images">
          <img src="./images/${getImagePath(
            dataDaily.descriptionId,
            true
          )}" alt="" />
          <img src="./images/${getImagePath(
            dataDaily.descriptionId,
            false
          )}" alt="" />
        </div>
        <p class="daily__temp">
          <span class="daily__temp--min">${dataDaily.temp.minimum.toFixed()}°</span> /
          <span class="daily__temp--max">${dataDaily.temp.maximum.toFixed()}°</span>
        </p>
      </div>
    `;
  }
}

export default new DailySectionView();

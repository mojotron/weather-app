import View from './View';
import { formatDate, formatTime, getImagePath } from '../helpers';

class CurrentSectionView extends View {
  _parentElement = document.querySelector('.weather__current');

  _generateMarkup() {
    console.log(this._data);
    return `
    <div class="weather__current">
      <div class="current__location">
        <p class="location__date">${formatDate(this._data.date)}</p>
        <p class="location__time">${formatTime(this._data.date)}</p>
        <p class="location__city">${this._data.city}</p>
      </div>
      <div class="current__image">
        <img
          class="image__forecast"
          src="./images/${getImagePath(this._data.description.id)}"
          alt="My Happy SVG"
        />
      </div>
      <div class="current__temp">${this._data.temp.current}°</div>
      <div class="current__info">
        <p class="info__description">${this._data.description.text}</p>
        <p>
          <span class="info__min">${this._data.temp.minimum}°</span> /
          <span class="info_max">${this._data.temp.maximum}°</span>
        </p>
        <p>feels like <spam class="info__flees-like">${
          this._data.temp.feelsLike
        }°</spam></p>
      </div>
    </div>
    `;
  }
}

export default new CurrentSectionView();

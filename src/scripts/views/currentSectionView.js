import View from './View';
import { formatDate, formatTime, getImagePath } from '../helpers';

class CurrentSectionView extends View {
  _parentElement = document.querySelector('.weather__current');

  _generateMarkup() {
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
          src="./images/${getImagePath(
            this._data.description.id,
            this._data.isDay
          )}"
          alt="My Happy SVG"
        />
      </div>
      <div class="current__temp">${this._data.temp.current.toFixed()}°</div>
      <div class="current__info">
        <p class="info__description">${this._data.description.text}</p>
        <p class="info__amplitude">
          <span class="info__min">${this._data.temp.minimum.toFixed()}°</span> /
          <span class="info_max">${this._data.temp.maximum.toFixed()}°</span>
        </p>
        <div class="info__feels-like">
          <img 
            class="info__feels-like__img"
            src="./images/temperature-feels-like.svg"
            alt="feels like icon"
          >
          <p><spam class="info__feels-like__para">${this._data.temp.feelsLike.toFixed()}°</spam></p>
        </div>
        
      </div>
    </div>
    `;
  }
}

export default new CurrentSectionView();

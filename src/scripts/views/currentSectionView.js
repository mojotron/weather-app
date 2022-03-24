import View from './View';
import { formatDate, formatTime, getImagePath } from '../helpers';

class CurrentSectionView extends View {
  _parentElement = document.querySelector('.weather__current');

  _generateMarkup() {
    console.log(this._data);
    return `
      <div class="current__location">
        <p class="location__date">${formatDate(this._data.current.date)}</p>
        <p class="location__time">${formatTime(this._data.current.date)}</p>
        <p class="location__city">${this._data.current.city}</p>
      </div>

      <div class="current__image">
        <img
          class="image__forecast"
          src="./images/${getImagePath(
            this._data.current.description.id,
            this._data.current.isDay
          )}"
          alt="My Happy SVG"
        />
      </div>

      <div class="current__temp">${this._data.current.temp.current.toFixed()}${
      this._data.units.temp
    }</div>

      <div class="current__info">
        <p class="info__description">${this._data.current.description.text}</p>
        <p class="info__amplitude">
          <span class="info__min">${this._data.current.temp.minimum.toFixed()}${
      this._data.units.temp
    }</span> /
          <span class="info_max">${this._data.current.temp.maximum.toFixed()}${
      this._data.units.temp
    }</span>
        </p>
        <div class="info__feels-like">
          <img 
            class="info__feels-like__img"
            src="./images/temperature-feels-like.svg"
            alt="feels like icon"
          >
          <p><spam class="info__feels-like__para">${this._data.current.temp.feelsLike.toFixed()}${
      this._data.units.temp
    }</spam></p>
        </div>
      </div>
    `;
  }
}

export default new CurrentSectionView();

import View from './View';
import { formatTime } from '../helpers';

class BonusSectionView extends View {
  _parentElement = document.querySelector('.weather__bonus');

  _generateMarkup() {
    return `
      <div class="bonus bonus__uvindex">
        <img
          class="icon"
          src="./images/uv-index-alt-svgrepo-com.svg"
          alt=""
        />
        <p data="uv-index">${this._data.bonus.uvIndex}</p>
      </div>
      
      <div class="bonus bonus__sunset">
        <img class="icon" src="./images/sunset-svgrepo-com.svg" alt="" />
        <p>${formatTime(this._data.bonus.sunset)}</p>
      </div>

      <div class="bonus bonus__sunrise">
        <img class="icon" src="./images/sunrise-svgrepo-com.svg" alt="" />
        <p>${formatTime(this._data.bonus.sunrise)}</p>
      </div>

      <div class="bonus bonus__wind">
        <img class="icon" src="./images/wind-svgrepo-com.svg" alt="" />
        <p>${this._data.bonus.wind.speed} ${this._data.units.wind}</p>
        <img data="wind-direction" class="icon" src="./images/up-arrow-svgrepo-com.svg" alt="" />
      </div>

      <div class="bonus bonus__humidity">
        <img class="icon" src="./images/humidity-svgrepo-com.svg" alt="" />
        <p>${this._data.bonus.humidity}%</p>
      </div>

      <div class="bonus bonus__pressure">
        <img class="icon" src="./images/barometer-svgrepo-com.svg" alt="" />
        <p>${this._data.bonus.pressure} hpa</p>
      </div>
    `;
  }

  addWindDirection() {
    const element = document.querySelector('[data="wind-direction"]');
    element.style.setProperty(
      'transform',
      `rotate(${this._data.bonus.wind.deg}deg)`
    );
  }

  addUVStyle() {
    const element = document.querySelector('[data="uv-index"]');
    const { uvIndex } = this._data.bonus;
    const color =
      uvIndex < 3
        ? '--uv-low'
        : uvIndex < 6
        ? '--uv-medium'
        : uvIndex < 8
        ? '--uv-high'
        : '--uv-very-high';
    element.style.setProperty('color', `var(${color})`);
  }
}

export default new BonusSectionView();

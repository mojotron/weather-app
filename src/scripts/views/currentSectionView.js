import View from './View';

class CurrentSectionView extends View {
  _parentElement = document.querySelector('.weather__current');

  _generateMarkup() {
    return `
    <div class="weather__current">
      <div class="current__location">
        <p class="location__date">Friday, 15th May</p>
        <p class="location__time">18:25</p>
        <p class="location__city">Zagreb</p>
      </div>
      <div class="current__image">
        <img
          class="image__forecast"
          src="./images/day.svg"
          alt="My Happy SVG"
        />
      </div>
      <div class="current__temp">23°</div>
      <div class="current__info">
        <p class="info__description">clear sky</p>
        <p>
          <span class="info__min">16°</span> /
          <span class="info_max">28°</span>
        </p>
        <p>feels like <spam class="info__flees-like">30°</spam></p>
      </div>
    </div>
    `;
  }
}

export default new CurrentSectionView();

import View from './View';

class AlertsSectionView extends View {
  _parentElement = document.querySelector('.weather__alerts');

  _generateMarkup() {
    return this._data
      .map((alertData, i) => this._generateAlertMarkup(alertData, i))
      .join('\n');
  }

  _generateAlertMarkup(alertData, i) {
    return `
      <div class="alert" data-alert-id="${i}">
        <button class="btn--close-alert">X</button>
        <h3 class="alert__tag">${alertData.tag}</h3>
        <div class="alert__description">
          ${alertData.description.map(line => `<p>${line}</p>`).join('')}
        </div>
      </div>
    `;
  }

  closeAlert() {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.matches('.btn--close-alert');
      if (!btn) return;
      const alertEle = e.target.closest('.alert');
      alertEle.remove();
    });
  }
}

export default new AlertsSectionView();

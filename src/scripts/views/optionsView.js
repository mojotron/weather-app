import View from './View';

class OptionsView extends View {
  _parentElement = document.querySelector('.options');

  _optionsBtn = this._parentElement.querySelector('.btn--options');

  _optionsModal = this._parentElement.querySelector('.options__modal');

  _optionsForm = this._parentElement.querySelector('.options-form');

  _searchBar = this._parentElement.querySelector('.search__bar');

  _searchResults = this._parentElement.querySelector('.search__results');

  _updateBtn = this._parentElement.querySelector('.btn--update');

  constructor() {
    super();
    this._optionsBtn.addEventListener('click', this._toggleModal.bind(this));
  }

  _toggleModal() {
    this._optionsModal.classList.toggle('modal--active');
  }

  addSearchSubmitHandler(handler) {
    this._optionsForm.addEventListener('submit', e => {
      e.preventDefault();

      const city = this._parentElement
        .querySelector('#city--search')
        .value.trim();
      const cityTest = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/.test(city);

      if (!cityTest && city !== '') return;
      handler(city);
    });
  }

  renderSearchResults(data) {
    const markup = data
      .map((obj, i) => this._generateSearchElementMarkup(obj, i))
      .join('\n');
    this._searchResults.innerHTML = '';
    this._searchResults.insertAdjacentHTML('afterbegin', markup);
  }

  _generateSearchElementMarkup(searchObj, i) {
    return `
      <div class="search-result" data-index=${i}>
        <p>${searchObj.city} ${searchObj.state ?? ''} ${searchObj.country}</p>
        <p>(lat: ${searchObj.lat.toFixed(3)},lon: ${searchObj.lon.toFixed(
      3
    )})</p>
      </div>
    `;
  }

  addSearchMatchHandler(handler) {
    this._searchResults.addEventListener('click', e => {
      const match = e.target.closest('.search-result');
      if (!match) return;
      handler(match.dataset.index);
    });
  }

  updateSearchBar(data) {
    this._searchBar.value = `${data.city} ${data.country}`;
    this._searchResults.innerHTML = '';
  }

  addUpdateAppHandler(handler) {
    this._updateBtn.addEventListener('click', () => {
      const units = this._parentElement.querySelector(
        'input[name="units-system"]:checked'
      ).value;
      this._toggleModal();
      this._searchBar.value = '';
      this._searchBar.blur();
      this._searchResults.innerHTML = '';
      handler(units);
    });
  }
}

export default new OptionsView();

export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._insertMarkup(markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insertMarkup(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <img class="spinner" src="./images/spinner-solid-svgrepo-com.svg"/>
    `;
    this._insertMarkup(markup);
  }

  renderError() {
    const markup = `
      <div class="error">
        <p class="error__message">${this._errorMessage}</p>
      </div>
    `;
    this._insertMarkup(markup);
  }
}

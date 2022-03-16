export default class View {
  _data;

  _parentElement;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // renderSpinner() {}

  _clear() {
    this._parentElement.innerHtml = '';
  }
}

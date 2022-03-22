import View from './View';

class OptionsView extends View {
  _parentElement = document.querySelector('.options');

  _optionsBtn = this._parentElement.querySelector('.btn--options');

  _optionsModal = this._parentElement.querySelector('.options__modal');

  _optionsForm = this._parentElement.querySelector('.options-form');

  constructor() {
    super();
    this._optionsBtn.addEventListener('click', this._toggleModal.bind(this));
  }

  _toggleModal() {
    this._optionsModal.classList.toggle('modal--active');
  }

  addSubmitHandler(handler) {
    this._optionsForm.addEventListener('submit', e => {
      e.preventDefault();
      // getting data (unit system from radio btn and city name from text input)
      // text input can be empty string
      const units = this._parentElement.querySelector(
        'input[name="units-system"]:checked'
      ).value;
      // active radio and text input
      const city = this._parentElement
        .querySelector('#city--search')
        .value.trim();

      // simple form validation for city name, if city is invalid return
      // if city is empty string call handler, MCV will check if units are diff,
      // if are make new api call if not simply ignore user update
      const cityTest = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\',]+$/.test(city);

      if (!cityTest && city !== '') return;
      // form validation
      console.log('city test:', cityTest);
      handler({ units, city });
    });
  }
}

export default new OptionsView();

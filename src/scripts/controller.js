import '../styles/main.css';
import { UNITS } from './config';
import * as model from './model';
import currentSectionView from './views/currentSectionView';
import hourlySectionView from './views/hourlySectionView';
import dailySectionView from './views/dailySectionView';
import bonusSectionView from './views/bonusSectionView';
import optionsView from './views/optionsView';
import alertsSectionView from './views/alertsSectionView';

// load all images to dist, so we can use './images/img-name.svg' path in views
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/));

const controlWeatherData = async (getLocation = true) => {
  try {
    currentSectionView.renderSpinner();
    await model.loadWeatherData(getLocation);

    currentSectionView.render({
      units: model.state.units,
      current: model.state.current,
    });

    hourlySectionView.render({
      units: model.state.units,
      hourly: model.state.hourly,
    });

    dailySectionView.render({
      units: model.state.units,
      daily: model.state.daily,
    });

    bonusSectionView.render({
      units: model.state.units,
      bonus: model.state.bonus,
    });
    bonusSectionView.addWindDirection();
    bonusSectionView.addUVStyle();

    alertsSectionView.render(model.state.alerts);
  } catch (error) {
    currentSectionView.renderError();
  }
};
const controlOptionsSearchSubmit = async city => {
  try {
    await model.loadCityNames(city);
    const data = model.state.searchResults;
    if (data.length === 0) return;
    if (data.length > 0) optionsView.renderSearchResults(data);
  } catch (error) {
    currentSectionView.renderError();
  }
};

const controlSearchResult = index => {
  model.state.searchIndex = +index;
  optionsView.updateSearchBar(
    model.state.searchResults[model.state.searchIndex]
  );
};

const controlAppUpdate = units => {
  if (model.state.units.label === units && model.state.searchIndex === null)
    return;
  if (model.state.units.label !== units) {
    model.state.units = UNITS[units];
    model.setLocalStorage(units);
  }
  if (model.state.searchIndex !== null) {
    model.state.lat = model.state.searchResults[model.state.searchIndex].lat;
    model.state.lon = model.state.searchResults[model.state.searchIndex].lon;
  }
  controlWeatherData(false);
};

const init = () => {
  // set units
  controlWeatherData();
  optionsView.selectUnitsRadioInput(model.state.units.label);
  optionsView.addSearchSubmitHandler(controlOptionsSearchSubmit);
  optionsView.addSearchMatchHandler(controlSearchResult);
  optionsView.addUpdateAppHandler(controlAppUpdate);
  alertsSectionView.closeAlert();
};

init();

import '../styles/main.css';
import * as model from './model';
import currentSectionView from './views/currentSectionView';
import hourlySectionView from './views/hourlySectionView';
import dailySectionView from './views/dailySectionView';
import bonusSectionView from './views/bonusSectionView';
import optionsView from './views/optionsView';
// load all images to dist, so we can use './images/img-name.svg' path in views
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/));

const controlWeatherData = async (getLocation = true) => {
  try {
    await model.loadWeatherData(getLocation);
    currentSectionView.render(model.state.current);
    hourlySectionView.render(model.state.hourly);
    dailySectionView.render(model.state.daily);
    bonusSectionView.render(model.state.bonus);
    bonusSectionView.addWindDirection();
    bonusSectionView.addUVStyle();
  } catch (error) {
    console.log(error);
    // TODO render error element
  }
};
const controlOptionsSearchSubmit = async city => {
  try {
    await model.loadCityNames(city);
    const data = model.state.searchResults;
    if (data.length === 0) return; // TODO render error
    if (data.length === 1) return; // TODO make api call
    if (data.length > 1) optionsView.renderSearchResults(data); // TODO display search options
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResult = index => {
  model.state.searchIndex = index;
  optionsView.updateSearchBar(
    model.state.searchResults[model.state.searchIndex]
  );
};

const controlAppUpdate = () => {
  console.log(model.state);
  // update units if diff
  // update city if diff
};

const init = () => {
  controlWeatherData();
  optionsView.addSearchSubmitHandler(controlOptionsSearchSubmit);
  optionsView.addSearchMatchHandler(controlSearchResult);
  optionsView.addUpdateAppHandler(controlAppUpdate);
};

init();

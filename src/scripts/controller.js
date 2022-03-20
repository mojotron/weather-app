import '../styles/main.css';
import * as model from './model';
import currentSectionView from './views/currentSectionView';
import hourlySectionView from './views/hourlySectionView';
import dailySectionView from './views/dailySectionView';
// load all images to dist, so we can use './images/img-name.svg' path in views
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context('../images/', true, /\.(png|jpg|jpeg|gif|svg)$/));

const controlWeatherData = async () => {
  try {
    await model.loadWeatherData();
    currentSectionView.render(model.state.current);
    hourlySectionView.render(model.state.hourly);
    dailySectionView.render(model.state.daily);
  } catch (error) {
    console.log(error);
    // TODO render error element
  }
};

const init = () => {
  controlWeatherData();
};

init();

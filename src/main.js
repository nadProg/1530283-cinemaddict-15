import { getAllFilms } from './mock/films.js';
import { filter } from './utils/film.js';
import { getRank } from './utils/profile.js';
import { ClassName, FilterType, Screen } from './const.js';
import { render } from './utils/render.js';
import RankModel from './models/rank.js';
import FilmsModel from './models/films.js';
import FilterModel from './models/filter.js';
import FooterStatisticView from './views/footer-statistic.js';
import ProfilePresenter from './presenters/profile.js';
import NavigationPresenter from './presenters/navigation.js';
import FilmsScreenPresenter from './presenters/films-screen.js';
import StatisticScreenPresenter from './presenters/statisctic-screen.js';


// Генерация моковых данных

const mockFilms = getAllFilms();
const mockRank = getRank(filter[FilterType.HISTORY](mockFilms).length);

// Поиск основных узлов для рендеринга

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.${ClassName.HEADER}`);
const mainElement = bodyElement.querySelector(`.${ClassName.MAIN}`);
const footerElement = bodyElement.querySelector(`.${ClassName.FOOTER}`);


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticView = new FooterStatisticView(amount);
  render(container, footerStatisticView);
};


// Рендеринг приложения

const rankModel = new RankModel(mockRank);
const filterModel = new FilterModel();
const filmsModel = new FilmsModel(mockFilms);

const profilePresenter = new ProfilePresenter(headerElement, rankModel, filmsModel);
const navigationPresenter = new NavigationPresenter(mainElement, filterModel, filmsModel, renderScreen);
const filmsScreenPresenter = new FilmsScreenPresenter(mainElement, filmsModel, filterModel);
const statisticScreenPresenter = new StatisticScreenPresenter(mainElement);


let currentScreen = null;

function renderScreen(screen) {
  if (screen === currentScreen) {
    return;
  }

  currentScreen = screen;
  switch (screen) {
    case Screen.FILMS:
      statisticScreenPresenter.destroy();
      filmsScreenPresenter.init();
      break;

    case Screen.STATISTIC:
      filmsScreenPresenter.destroy();
      statisticScreenPresenter.init();
      break;
  }
}


profilePresenter.init();
navigationPresenter.init();

renderScreen(Screen.FILMS);

renderFooterStatisctic(footerElement, mockFilms.length);

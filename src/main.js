import { getAllFilms } from './mock/films.js';
import { generateFilters, getFilterCountByName } from './mock/filters.js';
import { ClassName } from './const.js';
import { render } from './utils/render.js';
import ProfileView from './views/profile.js';
import FooterStatisticView from './views/footer-statistic.js';
import NavigationPresenter from './presenters/navigation.js';
import MainScreenPresenter from './presenters/main-screen.js';
import FilmsModel from './models/films.js';
import FilterModel from './models/filter.js';

// Генерация моковых данных

const mockFilms = getAllFilms();

const mockFilters = generateFilters(mockFilms);

const allFilmsAmount = getFilterCountByName(mockFilters, 'all');
const historyFilmsAmount = getFilterCountByName(mockFilters, 'history');


// Поиск основных узлов для рендеринга

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.${ClassName.HEADER}`);
const mainElement = bodyElement.querySelector(`.${ClassName.MAIN}`);
const footerElement = bodyElement.querySelector(`.${ClassName.FOOTER}`);


// Функция рендеринга звания пользователя в хедере

const renderProfile = (container, watchedFilmsAmount) => {
  const profileView = new ProfileView(watchedFilmsAmount);
  render(container, profileView);
};


// Функция рендеринга статистики в футере

const renderFooterStatisctic = (container, amount) => {
  const footerStatisticView = new FooterStatisticView(amount);
  render(container, footerStatisticView);
};


// Рендеринг приложения

const filterModel = new FilterModel();
const filmsModel = new FilmsModel(mockFilms);

const navigationPresenter = new NavigationPresenter(mainElement, filterModel, filmsModel);
const mainScreenPresenter = new MainScreenPresenter(mainElement, filmsModel, filterModel);

renderProfile(headerElement, historyFilmsAmount);
renderFooterStatisctic(footerElement, allFilmsAmount);

navigationPresenter.init();
mainScreenPresenter.init();
